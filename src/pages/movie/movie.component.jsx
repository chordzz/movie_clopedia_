import React, { Component } from "react";


import { API_KEY, API_URL } from "../../config.js";

import Header from '../../components/header/header-component';

// import Navigation from '../../components/Navigation/Navigation';
// import MovieInfo from '../../components/MovieInfo/MovieInfo';
// import MovieInfoBar from '../../components/MovieInfoBar/MovieInfoBar';
import Navigation from "../../components/navigation/navigation.component.jsx";
import MovieInfo from "../../components/movie-info/movie-info.component.jsx";
import MovieInfoBar from "../../components/movie-info-bar/movie-info-bar.component.jsx";
import Actor from '../../components/actor/actor.component.jsx';
import CustomGrid from "../../components/custom-grid/custom-grid.component";

import "./movie.styles.css";

class Movie extends Component {
  constructor() {
    super();

    this.state = {
      movie: null,
      isLoading: false,
      directors: [],
      actors: null
    };
  }

  componentDidMount () {
    // console.log(this.props)
    const { movieId } = this.props.match.params;

    if (localStorage.getItem(`${movieId}`)) {
      let state = JSON.parse(localStorage.getItem(`${movieId}`))
      this.setState({ ...state })
    } else {
      this.setState({ isLoading: true })
      // First fetch the movie ...
      let endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
      this.fetchItems(endpoint);
    }
    
  }

  fetchItems (endpoint) {
    const { movieId } = this.props.match.params;

    fetch(endpoint)
    .then( result => result.json())
    .then( result => {
      if (result.status_code) {
        // If we don't find any movie
        this.setState({ isLoading: false });
      }else{
        this.setState({movie: result},
          () => {
            let endpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;

            fetch(endpoint)
              .then((result) => result.json())
              .then((result) => {
                const directors = result.crew.filter(
                  (member) => member.job === "Director"
                );

                this.setState(
                  {
                    actors: result.cast,
                    directors,
                    isLoading: false,
                  },
                  () => {
                    localStorage.setItem(
                      `${movieId}`,
                      JSON.stringify(this.state)
                    );
                  }
                );
              });
          }
        )
      }
      
    })
    .catch((error) => console.error("Error:", error));
  }

  
  

  render() {
    const { movie, actors, directors, isLoading } = this.state;
    const { movieName } = this.props.location;
    
    return (
      <>
        <Header />
        {/* {isLoading ? "Loading" : "Done"} */}
        <div className="movie">
          {movie ? (
              <div>
                <Navigation movie = {movieName} />
                <MovieInfo movie={movie} directors={directors} />
                <MovieInfoBar
                  time={movie.runtime}
                  budget={movie.budget}
                  revenue={movie.revenue}
                />
                
                {/* <Navigation movie={movieName} />
                <MovieInfo movie={movie} directors={directors} />
                <MovieInfoBar
                  time={movie.runtime}
                  budget={movie.budget}
                  revenue={movie.revenue}
                /> */}
                {/* {movieName} */}
              </div>
            ) : null}
          {actors ? (
                <div className="rmdb-movie-grid">
                  <CustomGrid header = "Actors">
                    {actors.map( (element, i) => (
                      <Actor key={i} actor={element} />
                    ))}
                  </CustomGrid>
                </div>
              ) : null}
          {!actors && !isLoading ? <h1>No movie found</h1> : null}
          
        {/* {loading ? <Spinner /> : null} */}
        </div>
      </>
    );
  }
}

export default Movie;

// import React from "react";

// import {
//   API_KEY,
//   API_URL,
//   IMAGE_BASE_URL,
//   POSTER_SIZE,
//   BACKDROP_SIZE,
// } from "../../config.js";

// import MovieList from "../../components/movie-list/movie-list.component.jsx";

// import "./movie.styles.css";

// class Movie extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//       movie: null,
//       actors: null,
//       directors: [],
//       loading: false,
//     };
//   }

//   componentDidMount() {
//     const { movieId } = this.props.match.params;
//     this.setState({ loading: true });
//     // First fetch the movie ...
//     let endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
//     this.fetchItems(endpoint);
//   }

//   fetchItems = (endpoint) => {
//     // ES6 destructuring the props
//     const { movieId } = this.props.match.params;

//     fetch(endpoint)
//       .then((result) => result.json())
//       .then((result) => {
//         if (result.status_code) {
//           // If we don't find any movie
//           this.setState({ loading: false });
//         } else {
//           this.setState({ movie: result }, () => {
//             // ... then fetch actors in the setState callback function
//             let endpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
//             fetch(endpoint)
//               .then((result) => result.json())
//               .then((result) => {
//                 const directors = result.crew.filter(
//                   (member) => member.job === "Director"
//                 );

//                 this.setState(
//                   {
//                     actors: result.cast,
//                     directors,
//                     loading: false,
//                   },
//                   () => {
//                     localStorage.setItem(
//                       `${movieId}`,
//                       JSON.stringify(this.state)
//                     );
//                   }
//                 );
//               });
//           });
//         }
//       })
//       .catch((error) => console.error("Error:", error));
//   };

//   render() {
//     const { movieName } = this.props.location;
//     const { movie, directors, actors, loading } = this.state;

//     return (
//       <div className="rmdb-movie">
//         {movie ? (
//           <div>
//             {/* <Navigation movie={movieName} />
//             <MovieInfo movie={movie} directors={directors} />
//             <MovieInfoBar
//               time={movie.runtime}
//               budget={movie.budget}
//               revenue={movie.revenue}
//             /> */}
//             {movieName}
//           </div>
//         ) : null}
//         {actors ? (
//           <div className="rmdb-movie-grid">
//             <MovieList movie={actors}></MovieList>
//           </div>
//         ) : null}
//         {!actors && !loading ? <h1>No movie found</h1> : null}
//         {/* {loading ? <Spinner /> : null} */}
//       </div>
//     );
//   }
// }

// export default Movie;
