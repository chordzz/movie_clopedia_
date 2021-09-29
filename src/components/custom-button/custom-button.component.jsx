import React from "react";

import { Link } from "react-router-dom";

import "./custom-button.styles.css";

const CustomButton = (props) => {
  return (
    <Link
      to={{
        pathname: `/${props.movieId}`,
        movieName: `${props.movieTitle}`,
      }}
    >
      <button
        onClick={props.callBack}
        className={`${props.type} custom-button`}
      >
        {props.children}
      </button>
    </Link>
  );
};

export default CustomButton;
