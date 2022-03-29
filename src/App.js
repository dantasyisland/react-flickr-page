import React, { Component } from 'react';
import axios from 'axios';
import apiKey from './config';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstState: 'Delete this',
    };
  }

  componentDidMount() {
    document.title = 'React Flickr Page';
  }
  render() {
    return (
      <div className='container'>
        <h1>Welcome</h1>
      </div>
    );
  }
}
