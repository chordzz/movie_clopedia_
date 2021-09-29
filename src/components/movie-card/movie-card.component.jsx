import React from "react";

import { Link } from "react-router-dom";

// import CustomButton from "../custom-button/custom-button.component.jsx";

// import boruto from "../../images/boruto.png";

import "./movie-card.styles.css";

const MovieCard = (props) => {
  // console.log(props);
  return (
    <Link
      to={{
        pathname: `/${props.movie.id}`,
        movieName: `${props.movie.original_title}`,
      }}
    >
      <div className="movie-card">
        <div className="movie-thumbnail">
          <img src={props.image} alt="Not Available" />
        </div>
        <div className="movie-title">{props.movie.original_title}</div>

        {/* <CustomButton
        movieId={props.movie.id}
        movieTitle={props.movie.original_title}
        type="movie-card-btn"
      >
        Details{" "}
      </CustomButton> */}
      </div>
    </Link>
  );
};

export default MovieCard;
