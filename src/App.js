import React, { useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { getAccessToken } from "./spotify";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Main from "./pages/Main";
import { useDispatch } from "react-redux";
import LikedSongs from "./pages/LikedSongs";
import Album from "./pages/Album";
import Player from "./components/Player";
import Search from "./pages/Search";
import { s } from "./instance";
import { set_user } from "./features/userSlice";

function App() {
  const [token, setToken] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const hash = getAccessToken();
    window.location.hash = "";
    const _token = hash.access_token;
    if (_token) {
      setToken(_token);
      s.setAccessToken(_token);
      s.getMe((err, data) => {
        dispatch(set_user(data));
      });
    }
  }, [dispatch]);
  console.log("access token >>>", token);
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="app">
      <Router>
        <Switch>
          <Route path="/album/:id">
            <div className="container">
              <Sidebar />
              <Album />
              <Player />
            </div>
          </Route>

          <Route path="/collection/tracks">
            <div className="container">
              <Sidebar />
              <LikedSongs />
              <Player />
            </div>
          </Route>
          <Route path="/playlist/:id">
            <div className="container">
              <Sidebar />
              <Main />
              <Player />
            </div>
          </Route>
          <Route path="/search">
            <div className="container">
              <Sidebar />
              <Search />
              <Player />
            </div>
          </Route>
          <Route exact path="/">
            {token ? (
              <div className="container">
                <Sidebar />
                <Home />
                <Player token={token} />
              </div>
            ) : (
              <Login />
            )}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
