import React, {Component} from 'react';
import axios from 'axios';
import apiKey from './config';

// Components
import SearchForm from './components/SearchForm';
import MainNav from './components/MainNav';
import PhotoContainer from './components/PhotoContainer';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isError: false,
      galleryData: {
        // catPhotos: [],
        // zenPhotos: [],
        // codingPhotos: [],
        searchData: [],
      },
      query: "cats",
    };
    // this.fetchData = () => {
    //   let catRequest = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=cats&per_page=24&format=json&nojsoncallback=1`;
    //   let zenRequest = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=zen&per_page=24&format=json&nojsoncallback=1`;
    //   let codingRequest = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=coding&per_page=24&format=json&nojsoncallback=1`;
    //   const catFetch = axios.get(catRequest);
    //   const zenFetch = axios.get(zenRequest);
    //   const codingFetch = axios.get(codingRequest);
    //   axios
    //     .all([catFetch, zenFetch, codingFetch])
    //     .then(
    //       axios.spread((...responses) => {
    //         this.setState({
    //           galleryData: {
    //             catPhotos: responses[0].data.photos.photo,
    //             zenPhotos: responses[1].data.photos.photo,
    //             codingPhotos: responses[2].data.photos.photo,
    //             searchData: [],
    //           },
    //         });
    //       })
    //     )
    //     .then(this.setState({isLoading: false}));
    // };
    // Query comes in from form
    this.searchTags = (query) => {
      this.setState({query})
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
    this.searchTags('cats');
  }

  render() {
    return (

      <div className='container'>

        <SearchForm searchTags={this.searchTags} query={this.state.query} />
        <MainNav />
        <PhotoContainer isLoading={this.state.isLoading} flickrData={this.state.galleryData.searchData} query={this.state.query} />
      </div>
    );
  }
}
