import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Main from "../components/Main";
import Sidebar from "../components/Sidebar";

function Home({ s }) {
  const [newReleases, setNewReleases] = useState([]);

  useEffect(() => {
    s.getNewReleases((err, data) => {
      setNewReleases(data.albums.items);
    });
  }, []);
  console.log("new releases 🚀 ", newReleases);
  return (
    <div className="p-5 overflow-scroll text-white bg-spotify-black flex-1 h-screen">
      <h1>New Releases</h1>

      {/*  */}
      <div className="grid lg:grid-cols-4  grid-cols-4">
        {newReleases?.map((n) => (
          <div className="p-4 hover:bg-transparent-rgba">
            <div className="rounded-md overflow-hidden">
              <img src={n.images[0].url} alt="" />
            </div>
            <p>{n.name}</p>
            <p className="text-gray-400">{n.artists[0].name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
