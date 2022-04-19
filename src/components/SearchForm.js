import React, { Component } from 'react';
import { MdImageSearch } from 'react-icons/md';

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.textInput = React.createRef();

    this.state = {
      searchText: '',
    };

    this.onSearchChange = (e) => {
      this.setState({ searchText: e.target.value });
    };

    this.onSubmit = (e) => {
      e.preventDefault();
      //url
      let path = `/results/${this.state.searchText}`;
      this.props.searchTags(this.state.searchText);
      this.props.history.push(path);
    };
  }

  render() {
    return (
      <div>
        <form className='search-form' onSubmit={this.onSubmit}>
          <input
            type='search'
            onChange={this.onSearchChange}
            name='search'
            placeholder={`Search your heart's desire...`}
          />
          <button
            type='submit'
            value='submit'
            id='submit'
            className='search-button'
          >
            <MdImageSearch className='search-icon' />
          </button>
        </form>
      </div>
    );
  }
}

export default SearchForm;
