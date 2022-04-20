import React, { Component } from 'react';
import axios from 'axios';
import apiKey from './config';
import { Route, Switch, withRouter } from 'react-router-dom';

// Components
import SearchForm from './components/SearchForm';
import MainNav from './components/MainNav';
import PhotoContainer from './components/PhotoContainer';
import NotFound from './components/NotFound';
import Error from './components/Error';
import NoMatch from './components/NoMatch';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isError: false,
      galleryData: [],
      query: '',
    };

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
            galleryData: result.data.photos.photo,
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
    this.searchTags('cats');
  }

  componentDidUpdate(prevProps, prevState) {
    document.title = `React Flickr Page - ${this.state.query}`;
    if (prevProps.location.pathname !== this.props.location.pathname) {
      let currentLocation = this.props.location.pathname;
      currentLocation = currentLocation.replace(/\/results\//, '');

      if (this.props.location.pathname === '/') {
        this.searchTags('cats');
      } else {
        this.searchTags(currentLocation);
      }
    }
  }

  render() {
    return (
      <div className='container'>
        <MainNav
          searchCats={() => this.searchTags('cats')}
          searchCoding={() => this.searchTags('coding')}
          searchMeditation={() => this.searchTags('meditation')}
        />

        <SearchForm searchTags={this.searchTags} history={this.props.history} />
        <Switch>
          <Route exact path='/'>
            {!this.state.isError ? (
              this.state.galleryData.length !== 0 ? (
                <PhotoContainer
                  isLoading={this.state.isLoading}
                  flickrData={this.state.galleryData}
                  query={this.state.query}
                />
              ) : (
                <NoMatch />
              )
            ) : (
              <Error />
            )}
          </Route>

          <Route exact path='/results/:search'>
            {!this.state.isError ? (
              this.state.galleryData.length !== 0 ? (
                <PhotoContainer
                  isLoading={this.state.isLoading}
                  flickrData={this.state.galleryData}
                  query={this.state.query}
                />
              ) : (
                <NoMatch />
              )
            ) : (
              <Error />
            )}
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
