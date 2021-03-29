import Header from "./components/header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home/Home";
import SingleMovie from "./components/SingleMovie";
import SingleTV from "./components/SingleTV";
import SinglePerson from "./components/SinglePerson";
import AllResults from "./components/AllResults";
import GenresQuery from "./components/GenresQuery";
import Reviews from "./components/Reviews";
import SingleReview from "./components/SingleReview";
import MovieStaff from "./components/MovieStaff";
import AllRecommend from "./components/AllRecommend";
import TvStaff from "./components/TvStaff";
import FilterMovies from "./components/FilterMovies";
import FilterTVs from "./components/FilterTVs";
import PopularPeople from "./components/PopularPeople";

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
          <Route path="/allresults">
            <AllResults />
          </Route>
          <Route path="/search/genres/:type">
            <GenresQuery />
          </Route>
          <Route path="/review/:id">
            <SingleReview />
          </Route>
          <Route path="/recommendations">
            <AllRecommend />
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
