import Header from "./components/header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home/Home";
import SingleMovie from "./components/Movie";
import SingleTV from "./components/TV";
import SinglePerson from "./components/Person";
import Reviews from './components/Reviews/'
import SingleReview from "./components/Reviews/SingleReview/index";
import MovieStaff from "./components/Movie/Staff";
import TvStaff from "./components/TV/Staff";
import FilterMovies from "./components/FilterMovies/index";
import FilterTVs from "./components/FilterTV/index";
import PopularPeople from "./components/PopularPeople/index";

function App() {
  return (
    <Router>
      <div
        className="App"
        style={{ backgroundColor: "#1f2833", color: "#45A29E", height: "100%" }}
      >
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/movie/:id-:title/reviews">
            <Reviews />
          </Route>
          <Route path="/movie/:id-:title/cast">
            <MovieStaff />
          </Route>
          <Route path="/movie/:id">
            <SingleMovie />
          </Route>
          <Route path="/tv/:id-:title/cast">
            <TvStaff />
          </Route>
          <Route path="/tv/:id">
            <SingleTV />
          </Route>
          <Route path="/person/:id">
            <SinglePerson />
          </Route>
          <Route path="/review/:id">
            <SingleReview />
          </Route>
          <Route path="/movies/:category">
            <FilterMovies />
          </Route>
          <Route path="/tvs/:category">
            <FilterTVs />
          </Route>
          <Route path="/people/popular">
            <PopularPeople />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

//how to hide my API key
//research about folder structures
//auto sugges earch
