import React, { Component } from 'react';
import axios from 'axios';
import apiKey from './config';

import loadingSpinner from './loadingSpinner.gif';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isError: false,
      searchQuery: '',
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

      axios.all([catFetch, zenFetch, codingFetch]).then(
        axios.spread((...responses) => {
          this.setState({
            galleryData: {
              catPhotos: responses[0].data.photos.photo,
              zenPhotos: responses[1].data.photos.photo,
              codingPhotos: responses[2].data.photos.photo,
            },
          });
        })
      );
    };

    // Query comes in from form
    this.searchTags = (query) => {
      this.setState({ searchQuery: query });
      const getPics = async () => {
        this.setState({ isLoading: true });
        this.setState({ isError: false });

        try {
          const result = await axios(
            `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${this.searchQuery}&per_page=24&format=json&nojsoncallback=1`
          );
          this.setState({ searchData: result.data.photos.photo });
          this.setState({ isLoading: false });
        } catch (error) {
          this.setState({ isError: true });
          this.setState({ isLoading: false });
          console.error(error);
        }
      };

      getPics();
    };
  }

  componentDidMount() {
    document.title = 'React Flickr Page';
    this.fetchData();
    this.searchTags('las vegas');
  }
  render() {
    return (
      <div className='container'>
        <h1>Welcome</h1>
        <button onClick={this.searchTags}>Click Me For Test</button>

        {/* Will display component */}
        {this.state.isLoading ? (
          <>
            <h1>Loading</h1>{' '}
            <img src={loadingSpinner} alt='Loading Screen Animation'></img>
          </>
        ) : (
          <h1>LOADED...LOADED!</h1>
        )}
        {/* Nothing if no error */}
        {!this.state.isError ? <h1>NO ERROR</h1> : <h1>BIG ERROR!</h1>}
      </div>
    );
  }
}
