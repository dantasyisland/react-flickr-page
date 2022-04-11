import React, {Component} from 'react'
import {MdImageSearch} from 'react-icons/md'
import {withRouter} from 'react-router-dom';

class SearchForm extends Component {
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
      //url
      let path = `/results/${this.state.searchText}`;
      this.props.searchTags(this.state.searchText)
      this.props.history.push(path);
    }
  }

  componentDidMount() {
    this.props.searchTags(this.props.match.params)
  }

  render() {
    return (
      <div>
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

export default withRouter(SearchForm)