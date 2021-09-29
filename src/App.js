import { React, Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PropTypes from 'prop-types';

// import Header from "./components/header/header-component.jsx";
import Home from "./pages/home/home.component.jsx";
import Movie from "./pages/movie/movie.component.jsx";
import NotFound from "./pages/not-found/not-found.component.jsx";

import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          {/* <Header /> */}
          <Switch>
            <Route path="/movie_clopedia_" component={Home} exact />
            <Route exact path="/not-available" component={NotFound}  />
            <Route path="/movie_clopedia_/:movieId" component={Movie} />
            
          </Switch>
        </div>
      </BrowserRouter>
      // 299536
      // <div className="App">

      //   <Header />
      //   <Home />
      //   <Movie />
      // </div>
    );
  }
}

App.propTypes = {
  movieId: PropTypes.number,
}

export default App;
