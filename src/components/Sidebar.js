import React, { useEffect, useState } from "react";
import { VscLibrary } from "react-icons/vsc";
import {
  AiOutlineSearch,
  AiFillHeart,
  AiOutlineHome,
} from "react-icons/ai";
import Spotify from "spotify-web-api-js";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";

var s = new Spotify();
function Sidebar() {
  const [playlists, setPlaylist] = useState([]);
  useEffect(() => {
    s.getUserPlaylists().then(
      function (data) {
        setPlaylist(data.items);
      },
      function (err) {
        console.error(err);
      }
    );
  }, []);
  return (
    <div className="container1 hidden sm:block bg-black h-screen w-56 font-sans font-semibold">
      {/* logo */}
      <div className="p-3">
        <Link to="/">
          <motion.img
            initial={{ y: -15 }}
            animate={{ y: 1 }}
            transition={{ duration: 0.5 }}
            className="h-12"
            src="/images/Spotify_Logo_RGB_White.svg"
            alt=""
          />
        </Link>
      </div>

      {/* menu */}
      <div className="">
        <NavLink
          exact
          className="text-gray-400 hover:text-white"
          activeClassName="text-spotify-green bg-spotify-black"
          to="/"
        >
          <motion.div
            initial={{ y: 15 }}
            animate={{ y: 1 }}
            className=" flex  py-3 px-3 items-center cursor-pointer"
          >
            <AiOutlineHome className=" mr-3  text-3xl" />
            <p className="">Home</p>
          </motion.div>
        </NavLink>

        <NavLink
          exact
          className="text-gray-400 hover:text-white"
          activeClassName="text-spotify-green "
          to="/search"
        >
          <motion.div
            initial={{ y: 15 }}
            animate={{ y: 1 }}
            className=" cursor-pointer  py-3 px-3 flex items-center"
          >
            <AiOutlineSearch className=" mr-3  text-3xl" />
            <p className="">Search</p>
          </motion.div>
        </NavLink>

        <motion.div
          initial={{ y: 15 }}
          animate={{ y: 1 }}
          className=" cursor-pointer  flex  py-3 px-3 items-center"
        >
          <VscLibrary className="text-gray-400 mr-3   text-3xl" />
          <p className="text-gray-400">Library</p>
        </motion.div>
      </div>

      {/* liked songs */}
      <div className="px-3">
        <Link to="/collection/tracks">
          <div className="mt-5 py-3 border-b-2 border-gray-600  flex">
            {/* icon */}
            <div className="w-7 mr-3 h-7 flex items-center justify-center bg-gradient-to-tl from-blue-600 to-white">
              <AiFillHeart className="text-white text-lg" />
            </div>
            <p className="text-gray-400 ">Liked songs</p>
          </div>
        </Link>
      </div>

      <div className="p-3">
        {playlists.map((playlist) => (
          <div key={playlist?.id} className="py-2">
            <Link to={`/playlist/${playlist.id}`}>
              <p className="text-gray-400">{playlist.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
