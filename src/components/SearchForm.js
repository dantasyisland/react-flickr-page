import React, {Component} from 'react'
import {MdImageSearch} from 'react-icons/md'
export default class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
    }

    this.onSearchChange = e => {
      this.setState({searchText: e.target.value})

    }

    this.onSubmit = e => {
      e.preventDefault();
      this.props.searchTags(this.state.searchText)

    }
  }

  render() {
    return (
      <div>
        <h1>Serach form works - add icons - delete this div</h1>
        <form className="search-form" onSubmit={this.onSubmit} >
          <input type="search"
            onChange={this.onSearchChange}
            name="search"
            placeholder="Search..." />
          <button type="submit" id="submit" className="search-button"><MdImageSearch /></button>
        </form>
      </div>
    )
  }
}
