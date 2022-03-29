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
      data: [],
    };

    // Query comes in from form
    this.fetchData = (query) => {
      this.setState({ searchQuery: query });
      const getPics = async () => {
        this.setState({ isLoading: true });
        this.setState({ isError: false });
        console.log('clicked');

        try {
          const result = await axios(
            `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${this.searchQuery}&per_page=24&format=json&nojsoncallback=1`
          );
          this.setState({ data: result.data.photos.photo });
          this.setState({ isLoading: false });
          console.log(this.state.data, this.state.isLoading);
        } catch (error) {
          this.setState({ isError: true });
          this.setState({ isLoading: false });
          console.log();
        }
      };

      getPics();

      //synthetic base event
      console.log(query);
    };
  }

  componentDidMount() {
    document.title = 'React Flickr Page';
  }
  render() {
    return (
      <div className='container'>
        <h1>Welcome</h1>
        <button onClick={this.fetchData}>Click Me For Test</button>

        {this.state.isLoading ? (
          <>
            <h1>Loading</h1>{' '}
            <img src={loadingSpinner} alt='Loading Screen Animation'></img>
          </>
        ) : (
          <h1>LOADED...LOADED!</h1>
        )}
      </div>
    );
  }
}
