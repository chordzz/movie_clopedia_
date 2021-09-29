import { React, Component } from "react";

import {
  API_KEY,
  API_URL,
  IMAGE_BASE_URL,
  POSTER_SIZE,
  // BACKDROP_SIZE,
} from "../../config.js";

import Header from "../../components/header/header-component.jsx";
import Intro from "../../components/intro-component/intro-component.jsx";
import CustomGrid from "../../components/custom-grid/custom-grid.component.jsx";
import MovieThumb from "../../components/movie-thumb/movie-thumb.component";
// import MovieList from "../../components/movie-list/movie-list.component.jsx";
// import CustomButton from "../../components/custom-button/custom-button.component.jsx";
// import SearchBar from "../../components/search-bar/search-bar.component.jsx";

import noImage from "../../images/no_image.jpg";

import "./home.styles.css";

class Home extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      heroImage: null,
      loading: false,
      currentPage: 0,
      totalPages: 0,
      searchTerm: "",
    };
  }

  componentDidMount() {
    // if(sessionStorage.getItem("searchState") !== ""){
    //     let state = JSON.parse(sessionStorage.getItem('searchState'))
    //     this.setState({ ...state })
    //     return
    // }
    // else 
    if(sessionStorage.getItem("HomeState")){
      let state = JSON.parse(sessionStorage.getItem('HomeState'));
      this.setState({ ...state })
    }else {
      this.setState({ loading: true })
      const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
      this.fetchItems(endpoint);
    }
    // let endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

    // this.fetchItems(endpoint);
  }

  fetchItems = (endpoint) => {
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        return this.setState({
          movies: [...this.state.movies, ...result.results],
          heroImage: result.results[0],
          loading: false,
          currentPage: result.page,
          totalPages: result.total_pages,
          // searchTerm: "",
        }, () => {
          // if (this.state.searchTerm === "") {
            sessionStorage.setItem('HomeState', JSON.stringify(this.state));
          // }
          //  else {
          //   sessionStorage.setItem('searchState', JSON.stringify(this.state));
          // }
        });
      })
      .catch(error => console.error('Error:', error));
  };

  loadMoreItems = () => {
    // ES6 Destructuring the state
    const { searchTerm, currentPage } = this.state;

    let endpoint = "";
    this.setState({ loading: true });

    if (searchTerm === "") {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
        currentPage + 1
      }`;
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=${
        currentPage + 1
      }`;
    }
    this.fetchItems(endpoint);
  };

  searchHandler = (param) => {
    let endpoint = "";
    this.setState({
      movies: [],
      loading: true,
      searchTerm: param,
    });

    if (this.state.searchTerm === "") {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${this.state.searchTerm}`;
    }

    this.fetchItems(endpoint);

    // fetch(endpoint)
    //   .then((result) => result.json())
    //   .then((result) => {
    //     return this.setState({
    //       movies: [...this.state.movies, ...result.results],
    //       heroImage: result.results[0],
    //       loading: true,
    //       currentPage: result.page,
    //       totalPages: result.total_pages,
    //       // searchTerm: "",
    //     }, () => {
    //       if (this.state.searchTerm !== "") {
    //         sessionStorage.setItem('searchState', JSON.stringify(this.state));
    //       }
    //     });
    //   });
  };

  // updateHeroImage = ( rand_number) => {

  //   this.setState({ heroImage: this.state.movies ? this.state.movies[rand_number] : null })

  // }

  // componentWillUnmount () {
    
  // }

  

  render() {
    const { heroImage, movies, searchTerm, currentPage, loading, totalPages } = this.state;
    // console.log(this.state);
    let header;
    searchTerm ? header = "Search Results" : header = "Popular Movies";
    

    
    return (
      <div>
        <Header doSearch  callback = {this.searchHandler} />
        <div className="home-page ">
          {heroImage ? (
            <Intro
              // image={
              //   heroImage.backdrop_path
              //     ? `${IMAGE_BASE_URL}${BACKDROP_SIZE}${heroImage.backdrop_path}`
              //     : noImage
              // }
              // movie = {heroImage}
              movies = {movies}
              title={heroImage.original_title}
              text={heroImage.overview}
              heroImage = {heroImage}
              // callback = {this.updateHeroImage}
              currentPage = {currentPage}
            />
          ) : null}
          {/* <SearchBar type="search" callback={this.searchHandler} /> */}
          
          <CustomGrid header = {header} loading = {loading}>
            {movies.map( (element, i) => (
                  <MovieThumb
                    key={i}
                    clickable={true}
                    image={element.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}` : noImage}
                    movieId={element.id}
                    movieName={element.original_title}
                  />
                  ))}
          </CustomGrid>
          {loading ? <h3>Loading Movies</h3> : null}

          {(currentPage <= totalPages && !loading) ?
              (
                <button
                  type="load-more-btn load-more container"
                  // callBack={this.loadMoreItems}
                  onClick={this.loadMoreItems}
                  className="loadMore-btn"
                >
                  Load More
                </button>
              )
              : null
            }
          
        </div>
      </div>
    );
  }
}

export default Home;

// render() {
//   return (
//     <div className="App">
//       <Header />
//       {this.state.heroImage ? (
//         <Intro
//           image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${this.state.heroImage.backdrop_path}`}
//           title={this.state.heroImage.original_title}
//           text={this.state.heroImage.overview}
//         />
//       ) : null}

//       <MovieList
//         header="Popular Movies"
//         movies={this.state.movies}
//         thumbnail_path={`${IMAGE_BASE_URL}${POSTER_SIZE}`}
//       />

//       <CustomBotton onClick={this.loadMoreItems}>Load More</CustomBotton>
//     </div>
//   );
// }
