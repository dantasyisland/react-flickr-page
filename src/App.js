import React, { Component } from 'react';
import axios from 'axios';
import apiKey from './config';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';

// Components
import SearchForm from './components/SearchForm';
import MainNav from './components/MainNav';
import PhotoContainer from './components/PhotoContainer';
import NotFound from './components/NotFound';

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

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.galleryData !== this.state.galleryData) {
  //     // Now fetch the new data here
  //   }
  //   console.log('its changed');
  //   console.log(this.props.history);
  // }

  render() {
    return (
      <div className='container'>
        <MainNav
          searchCats={() => this.searchTags('cats')}
          searchCoding={() => this.searchTags('coding')}
          searchZen={() => this.searchTags('zen')}
        />

        <SearchForm
          searchTags={this.searchTags}
          query={this.state.query}
          match={this.props.match}
          history={this.props.history}
        />
        <Switch>
          <Route exact path='/'>
            <PhotoContainer
              isLoading={this.state.isLoading}
              flickrData={this.state.galleryData.searchData}
              location={this.props.location}
              history={this.props.history}
              query={this.state.query}
            />
          </Route>

          {/* Undefined because no match oject */}

          <Route exact path='/results/:search'>
            <PhotoContainer
              isLoading={this.state.isLoading}
              flickrData={this.state.galleryData.searchData}
              query={this.state.query}
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
