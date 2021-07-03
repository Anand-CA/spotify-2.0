import React from "react";
import { login_url } from "../spotify";

function Login() {
  return (
    <div className="bg-spotify-black h-screen flex items-center px-3 flex-col justify-evenly">
      <img
        className="h-52"
        src="https://cdn.worldvectorlogo.com/logos/spotify-1.svg"
        alt=""
      />
      <a
        href={login_url}
        className="bg-spotify-green focus:ring-4 ring-green-400 py-4 px-10 font-semibold rounded-full text-white"
      >
        Login
      </a>
    </div>
  );
}

export default Login;
