import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import { getAccessToken, login_url } from "./spotify";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const hash = getAccessToken();
    window.location.hash = "";
    const _token = hash.access_token;
    if (_token) {
      setToken(_token);
    }
  }, []);

  console.log("token", token);
  return (
    <div className="app">
      Let's build a spotify clone 2.0 🚀
      <a
        href={login_url}
        style={{
          backgroundColor: "#008CBA",
          color: "#fff",
          padding: "10px 15px",
          cursor: "pointer",
        }}
      >
        Login
      </a>
    </div>
  );
}

export default App;
