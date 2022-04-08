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

import Home from './components/Home';

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}

  render() {
    return (
      <BrowserRouter>
        {/* Sub route with results - everything else is explicit - push to results */}
        <Route exact path='/' component={Home} />
        <Route path='/results' component={Home} />
        <Route path='/:query' component={Home} />
        <Route path='/:cats' component={Home} />
        <Route path='/:coding' component={Home} />
        <Route path='/:zen' component={Home} />
        <Route />
      </BrowserRouter>
    );
  }
}
