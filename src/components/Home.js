import React, {Component} from 'react';
import axios from 'axios';
import apiKey from '../config';

// Components
import SearchForm from './SearchForm';
import MainNav from './MainNav';
import PhotoContainer from './PhotoContainer';
import {BrowserRouter} from 'react-router-dom';
import {Route} from 'react-router-dom';
import {Switch} from 'react-router-dom';


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isError: false,
      galleryData: {
        searchData: [],
      },
      query: 'cats',
    };

    // Query comes in from form
    this.searchTags = (query) => {
      this.setState({query});
      const getPics = async () => {
        this.setState({isLoading: true});
        this.setState({isError: false});
        try {
          const result = await axios(
            `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${query}&per_page=24&format=json&nojsoncallback=1`
          );
          this.setState({
            galleryData: {
              ...this.state.galleryData,
              searchData: result.data.photos.photo,
            },
          });
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
    this.searchTags(this.props.match.params.query);
    console.log(this.props.match);
  }

  render() {
    return (
      <div className='container'>

        <SearchForm searchTags={this.searchTags} query={this.state.query} />


        <PhotoContainer
          isLoading={this.state.isLoading}
          flickrData={this.state.galleryData.searchData}
          query={this.state.query}
        />

      </div>
    );
  }
}
