import "./App.css";
import { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import DrugList from "./drugs/drug-list";
import DrugDetail from "./drugs/drug-detail";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import SearchIcon from "@material-ui/icons/Search";
import SvgIcon from "@material-ui/core/SvgIcon";
import ListIcon from "@material-ui/icons/List";
import ConfigDataContext from "./context/config-data-context";
import Home from "./components/home.component";
import DrugSearch from "./components/drug-search.component";

const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

function App() {
  const baseUrl = window.location.origin.includes("localhost")
    ? "http://localhost:9000"
    : window.location.origin;
  const classes = useStyles();
  const [valueRoute, setValueRoute] = useState(0);

  return (
    <ConfigDataContext.Provider value={{ baseUrl: baseUrl }}>
      <Router>
        <div style={{ width: "100%" }}>
          <BottomNavigation
            style={{ width: "100%", backgroundColor: "rgb(181 181 181)" }}
            value={valueRoute}
            onChange={(event, newValue) => {
              setValueRoute(newValue);
            }}
            showLabels
            className={classes.root}
          >
            <BottomNavigationAction
              label="Home"
              icon={<HomeIcon color="primary" />}
              component={Link}
              to="/"
            />
            <BottomNavigationAction
              label="See all drugs"
              icon={<ListIcon />}
              component={Link}
              to="/drug-list"
            />
            <BottomNavigationAction
              label="Search"
              icon={<SearchIcon />}
              component={Link}
              to="/drug-search"
            />
          </BottomNavigation>

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/drug-list">
              <DrugList />
            </Route>
            <Route path="/drug-search">
              <DrugSearch />
            </Route>
            <Route path="/drug-detail/:drugId">
              <DrugDetail />
            </Route>
          </Switch>
        </div>
      </Router>
    </ConfigDataContext.Provider>
  );
}

export default App;
