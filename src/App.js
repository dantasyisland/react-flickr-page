import React, {Component} from 'react'
import {Switch} from 'react-router-dom';

// Routing
import {BrowserRouter, Route} from 'react-router-dom';

import Home from './Home';
import SearchForm from './components/SearchForm';
import PhotoContainer from './components/PhotoContainer';
export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/cats' component={Home} />
            <Route path='/coding' component={Home} />
            <Route path='/zen' component={Home} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
