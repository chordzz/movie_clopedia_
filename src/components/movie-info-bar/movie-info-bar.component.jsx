import React from 'react';
// import PropTypes from 'prop-types';
// import FontAwesome from '@fortawesome/fontawesome';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTime} from "@fortawesome/free-solid-svg-icons";

import { calcTime, convertMoney } from '../../helpers.js';
import './movie-info-bar.styles.css';

// FontAwesome.library.add( faTime);

const MovieInfoBar = ({ time, budget, revenue }) => (
  <div className="movieinfobar container">
    <div className="movieinfobar-content">
      <div className="movieinfobar-content-col">
        {/* <FontAwesomeIcon icon = "time" className="fa-time" name="clock-o" size="2x" /> */}
        <span className="movieinfobar-info">Running time: {calcTime(time)}</span>
      </div>
      <div className="movieinfobar-content-col">
        {/* <FontAwesomeIcon icon = "budget" className="fa-budget" name="money" size="2x" /> */}
        <span className="movieinfobar-info">Budget: {convertMoney(budget)}</span>
      </div>
      <div className="movieinfobar-content-col">
        {/* <FontAwesomeIcon icon = "revenue" className="fa-revenue" name="ticket" size="2x" /> */}
        <span className="movieinfobar-info">Revenue: {convertMoney(revenue)}</span>
      </div>
    </div>
  </div>
)

// MovieInfoBar.propTypes = {
//   time: PropTypes.number,
//   budget: PropTypes.number,
//   revenue: PropTypes.number
// }

export default MovieInfoBar;