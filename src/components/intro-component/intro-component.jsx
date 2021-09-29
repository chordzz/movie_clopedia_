import React, { Component } from "react";


import {
  IMAGE_BASE_URL,
  BACKDROP_SIZE,
} from "../../config.js";


import noImage from "../../images/no_image.jpg";

import "./intro-styles.css";



class Intro extends Component {

  constructor() {
    super();

    this.state = {
      timerId: "",
      movieList: [],
      heroImage: null,
      currentPage: null
    }
  }

  componentDidMount () {
    // this.setState({ movieList: {...this.props.movies}, heroImage: this.props.heroImage, currentPage: this.props.currentPage })

    
    // let rand_number = Math.floor(Math.random() * (20 * this.props.currentPage));

    // this.setState({ movieList: this.props.movies, heroImage: movieList[0] })


    // this.setState({ timerId: setInterval(() => { 
    // let rand_number = Math.floor(Math.random() * (20 * this.props.currentPage));
    //     this.props.callback(rand_number);
    //   }, 20000)
    // })
    // this.setState({ timerId: setInterval(() => { 
    //   let rand_number = Math.floor(Math.random() * (20 * this.state.currentPage));
    //       this.updateHeroImage(rand_number);
    //     }, 4000)
    //   })
  }

  // componentDidUpdate () {
  //   this.setState({ movieList: {...this.props.movies}, heroImage: this.props.heroImage, currentPage: this.props.currentPage })
  // }

  // updateHeroImage = ( rand_number) => {

  //   this.setState({ heroImage: this.props.heroImage ? this.state.movieList[rand_number] : null })

  // }

  // componentWillUnmount () {
  //   clearTimeout(this.state.timerId);
  // }

  // updateHeroImage = () => {
  //   let rand_number = Math.floor(Math.random() * (20 * this.props.currentPage));

  //   setTimeout(() => { 
  //     this.props.callback(rand_number);
  //   }, 3000);
  // }
  
  
  render() {
    
    // const { movieList, heroImage } = this.state;
    
    
    return (
      <>
        {
          this.props.heroImage ? 
          (
            <div className="intro"
              style={{
                // background: this.props.movie.backdrop_path ? `url('${IMAGE_BASE_URL}${BACKDROP_SIZE}${this.props.movie.backdrop_path}')` : '#000'
                background: this.props.heroImage.backdrop_path ? `url('${IMAGE_BASE_URL}${BACKDROP_SIZE}${this.props.heroImage.backdrop_path}')` : `url('${noImage}')`
              }}
            >
              {/* {console.log(movieList)} */}
              <div className="intro-content container ">
                <div className="intro-text-div">
                  <div className="intro-movie-title">{this.props.heroImage.original_title}</div>
                  <div className="movie-summary">{this.props.heroImage.overview}</div>
                </div>
              </div>
            </div>
          )
          :
          <h3>Loading...</h3>
        }
          
      </>
    );
  }
};

export default Intro;
