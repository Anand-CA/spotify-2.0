import React from "react";
import { useParams } from "react-router-dom";
import Main from "../components/Main";
import Sidebar from "../components/Sidebar";

function Home() {
  return (
    <div className="flex text-white bg-spotify-black h-screen">
      <Sidebar />
      <Main />
    </div>
  );
}

export default Home;
