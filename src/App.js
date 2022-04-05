import React, {Component} from 'react';
import axios from 'axios';
import apiKey from './config';

// Components
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import MainNav from './components/MainNav';
import PhotoContainer from './components/PhotoContainer';
import Footer from './components/Footer';
import {BrowserRouter, Route} from 'react-router-dom';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isError: false,
      galleryData: {
        catPhotos: [],
        zenPhotos: [],
        codingPhotos: [],
        searchData: [],
      },
    };
    this.fetchData = () => {
      let catRequest = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=cats&per_page=24&format=json&nojsoncallback=1`;
      let zenRequest = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=zen&per_page=24&format=json&nojsoncallback=1`;
      let codingRequest = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=coding&per_page=24&format=json&nojsoncallback=1`;
      const catFetch = axios.get(catRequest);
      const zenFetch = axios.get(zenRequest);
      const codingFetch = axios.get(codingRequest);
      axios
        .all([catFetch, zenFetch, codingFetch])
        .then(
          axios.spread((...responses) => {
            this.setState({
              galleryData: {
                catPhotos: responses[0].data.photos.photo,
                zenPhotos: responses[1].data.photos.photo,
                codingPhotos: responses[2].data.photos.photo,
                searchData: [],
              },
            });
          })
        )
        .then(this.setState({isLoading: false}));
    };
    // Query comes in from form
    this.searchTags = (query) => {
      const getPics = async () => {
        this.setState({isLoading: true});
        this.setState({isError: false});
        try {
          const result = await axios(
            `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${query}&per_page=24&format=json&nojsoncallback=1`
          );
          this.setState({galleryData: {...this.state.galleryData, searchData: result.data.photos.photo}});
          this.setState({isLoading: false});
        } catch (error) {
          this.setState({isError: true});
          this.setState({isLoading: false});
          console.error(error);
        }
      };
      getPics();
    };
  }
  componentDidMount() {
    document.title = 'React Flickr Page';
    this.fetchData();
  }

  render() {
    return (

      <div className='container'>
        <BrowserRouter>
          <MainNav data={this.state.galleryData} />
          <SearchForm searchTags={this.searchTags} />

          <Route exact path="/" render={() =>
            <PhotoContainer flickrData={this.state.galleryData.zenPhotos} isLoading={this.state.isLoading} />
          } />
          <Route exact path="/cats" render={() => <PhotoContainer flickrData={this.state.galleryData.catPhotos} isLoading={this.state.isLoading} />} />
          <Route exact path="/coding" render={() => <PhotoContainer flickrData={this.state.galleryData.codingPhotos} isLoading={this.state.isLoading} />} />
          <Route exact path="/zen" render={() => <PhotoContainer flickrData={this.state.galleryData.zenPhotos} isLoading={this.state.isLoading} />} />

          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}
