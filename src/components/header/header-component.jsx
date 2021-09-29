import React from "react";

import { Link } from "react-router-dom";

import SearchBar from "../search-bar/search-bar.component.jsx";

import "./header-styles.css";

const Header = (props) => {
  return (
    <div className="header ">
      <div className="header-content container">
        <div className="header-logo">
          <Link to="/">Movie_Clopedia</Link>
        </div>
        
        <div className="header-menu-items">
          <ul className="header-nav-items">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/not-available">Tv Shows</Link>
            </li>
            <li>
              <Link to="/not-available">Movies</Link>
            </li>

            {props.doSearch ? <li><SearchBar type="search" callback = {props.callback} /></li> : null}
            
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
