import Header from "./components/header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home/Home";
import SingleMovie from "./components/SingleMovie";
import SingleTV from "./components/SingleTV";
import SinglePerson from "./components/SinglePerson";
import AllResults from "./components/AllResults";
import GenresQuery from "./components/GenresQuery";

function App() {
  return (
    <Router>
      <div className="App" style={{ backgroundColor: "black", color: "white" }}>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/movie/:id">
            <SingleMovie />
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
        </Switch>
      </div>
    </Router>
  );
}

export default App;

//how to hide my API key
//research about folder structures
//auto sugges earch
