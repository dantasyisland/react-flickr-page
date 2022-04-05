import React, {Component} from 'react';
import axios from 'axios';
import apiKey from './config';

import loadingSpinner from './loadingSpinner.gif';

// Components
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import MainNav from './components/MainNav';
import PhotoContainer from './components/PhotoContainer';
import Footer from './components/Footer';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isError: false,
      searchData: [],
      galleryData: {
        catPhotos: [],
        zenPhotos: [],
        codingPhotos: [],
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
          this.setState({searchData: result.data.photos.photo});
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
        <h1>Welcome</h1>

        <SearchForm searchTags={this.searchTags} />

        {/* Will display component */}
        {this.state.isLoading ? (
          <>
            <h1>Loading</h1>{' '}
            <img src={loadingSpinner} alt='Loading Screen Animation'></img>
          </>
        ) : (
          <PhotoContainer flickrData={this.state.searchData} />
        )}
        {/* Nothing if no error */}
        {!this.state.isError ? <h1>NO ERROR</h1> : <h1>BIG ERROR!</h1>}
        <Footer />
      </div>
    );
  }
}
