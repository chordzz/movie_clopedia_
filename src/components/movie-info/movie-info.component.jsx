import React from 'react';
import { IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from '../../config';
// import PropTypes from 'prop-types';
import FontAwesome from '@fortawesome/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MovieThumb from '../movie-thumb/movie-thumb.component';
import './movie-info.styles.css';
import noImage from "../../images/no_image.jpg";

import { faFilm } from "@fortawesome/free-solid-svg-icons";
FontAwesome.library.add(faFilm);

const MovieInfo = ({ movie, directors }) => (
  <div className="movieinfo"
    style={{
      background: movie.backdrop_path ? `url('${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie.backdrop_path}')` : '#000'
    }}
  >
    <div className="movieinfo-content container">
      <div className="movieinfo-thumb">
        <MovieThumb
          image={movie.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}` : noImage}
          clickable={false}
        />
      </div>
      <div className="movieinfo-text">
        <h1>{movie.title}</h1>
        {/* <h3>PLOT</h3> */}
        <p>{movie.overview}</p>
        <div className="rating-director">
          <div className="rating">
            <div className="rating-text">
              <h3>IMDB RATING</h3>
            </div>
            <div>
              <meter min="0" max="100" optimum="100" low="40" high="70" value={ movie.vote_average * 10}></meter>
              <p className="score">{movie.vote_average}</p>
            </div>
            
          </div>
          <div className="director">
            {directors.length > 1 ? <h3>DIRECTORS</h3> : <h3>DIRECTOR</h3>}
            {directors.map( (element, i) => {
              return <p key={i} className="director">{element.name}</p>
            })}
          </div>
          
        </div>
        
        
      </div>
      <FontAwesomeIcon icon= "film" className = "fa-film-icon"/>
    </div>
  </div>
)

// MovieInfo.propTypes = {
//   movie: PropTypes.object,
//   directors: PropTypes.array
// }

export default MovieInfo;