import React, { useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SpotifyPlayer from "react-spotify-web-playback";
import {
  client_id,
  client_secret,
  getAccessToken,
  redirect_uri,
} from "./spotify";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Main from "./pages/Main";
import { set_instance, set_user } from "./features/userSlice";
import { useDispatch } from "react-redux";
import LikedSongs from "./pages/LikedSongs";
import Album from "./pages/Album";
import Player from "./components/Player";
import Header from "./components/Header";
import Search from "./pages/Search";
import Library from "./pages/Library";
import { selectIsPlaying } from "./features/songSlice";
import { s } from "./instance";

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
    }
  }, []);
  console.log("toke.n", token);
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/album/:id">
            <div className="flex">
              <Sidebar />
              <Album />
              <Player  />
            </div>
          </Route>
          <Route path="/collection/playlist">
            <div className="flex">
              <Sidebar />
              <Library />
              <Player />
            </div>
          </Route>

          <Route path="/collection/tracks">
            <div className="flex">
              <Sidebar />
              <LikedSongs  />
              <Player  />
            </div>
          </Route>
          <Route path="/playlist/:id">
            <div className="flex w-full ">
              <Sidebar />
              <Main />
              <Player  />
            </div>
          </Route>
          <Route path="/search">
            <div className="flex">
              <Sidebar />
              <Search  />
              <Player token={token} />
            </div>
          </Route>
          <Route exact path="/">
            {token ? (
              <div className="flex">
                <Sidebar />
                <Home  />
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
