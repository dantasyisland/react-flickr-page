import React, { Component } from 'react';
import axios from 'axios';
import apiKey from './config';

// Components
import SearchForm from './components/SearchForm';
import MainNav from './components/MainNav';
import PhotoContainer from './components/PhotoContainer';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import NotFound from './components/NotFound';
import { withRouter } from 'react-router-dom';

import Test from './Test';

class App extends Component {
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
      this.setState({ query });
      const getPics = async () => {
        this.setState({ isLoading: true });
        this.setState({ isError: false });
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
    this.searchTags('javascript');
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.galleryData !== this.state.galleryData) {
      // Now fetch the new data here
      console.log('its changed');
    }
  }

  render() {
    return (
      <div className='container'>
        <Test match={this.props.match} history={this.props.history} />
        <MainNav
          searchCats={() => this.searchTags('cats')}
          searchCoding={() => this.searchTags('coding')}
          searchZen={() => this.searchTags('zen')}
        />

        <SearchForm
          searchTags={this.searchTags}
          query={this.state.query}
          match={this.props.match}
        />
        <Switch>
          <Route exact path='/'>
            <PhotoContainer
              isLoading={this.state.isLoading}
              flickrData={this.state.galleryData.searchData}
            />
          </Route>

          {/* Undefined because no match oject */}
          <Route exact path='/cats'>
            <PhotoContainer
              isLoading={this.state.isLoading}
              flickrData={this.state.galleryData.searchData}
            />
          </Route>

          <Route exact path='/results/:search'>
            <PhotoContainer
              isLoading={this.state.isLoading}
              flickrData={this.state.galleryData.searchData}
            />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    );
  }
}
export default withRouter(App);
