import React, { Component } from "react";

import FontAwesome from '@fortawesome/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import "./search-bar.styles.css";


FontAwesome.library.add(faSearch);

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      value: "",
    };
  }

  // Must have this here so we can reset it
  timeout = null;

  doSearch = (event) => {
    // ES6 Destructuring prop
    const { callback } = this.props;

    this.setState({ value: event.target.value });
    clearTimeout(this.timeout);
    // Set a timeout to wait for the user to stop writing
    // So we don´t have to make unnessesary calls
    this.timeout = setTimeout(() => {
      callback(this.state.value);
    }, 500);

    // sessionStorage.setItem('searchState', JSON.stringify(""));
  };

  componentDidMount () {
    if(sessionStorage.getItem('HomeState') !== ""){
      let test = JSON.parse(sessionStorage.getItem('HomeState'))
      this.setState({ value: test.searchTerm})
    }
  }

  render() {
    // ES6 Destructuring state
    const { value } = this.state;
    // let test = JSON.parse(sessionStorage.getItem('HomeState'));
    // console.log(test.searchTerm);

    return (
      <div className="searchbar">
        <div className="searchbar-content">
          {/* <FontAwesomeIcon icon = "coffee" className="fa-search-icon" name="search" size="2x" /> */}
          <FontAwesomeIcon icon= "search" className = "fa-searchbar-icon"/>
          
          <input
            type="text"
            className="searchbar-input"
            placeholder="Search"
            onChange={this.doSearch}
            value={value}
          />
        </div>
      </div>
    );
  }
}

export default SearchBar;
