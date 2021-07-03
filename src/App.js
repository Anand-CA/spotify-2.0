import React, { useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import {
  client_id,
  client_secret,
  getAccessToken,
  redirect_uri,
} from "./spotify";
import Spotify from "spotify-web-api-js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import { set_user } from "./features/userSlice";
import { useDispatch } from "react-redux";
var s = new Spotify();

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
      s.getMe().then((user) => {
        dispatch(set_user(user));
      });
    }
  }, []);

  console.log("token", token);
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/playlist/:id">
            <div className="flex w-full ">
              <Sidebar />
              <Main />
            </div>
          </Route>
          <Route exact path="/">
            {token ? <Sidebar /> : <Login />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
