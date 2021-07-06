import React, { useEffect, useState } from "react";
import { VscLibrary } from "react-icons/vsc";
import {
  AiOutlineSearch,
  AiFillHeart,
  AiOutlineHome,
  AiFillHome,
} from "react-icons/ai";
import Spotify from "spotify-web-api-js";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import "../css/global.css";

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
    <div className="hidden sm:block bg-black h-screen w-56 font-sans font-semibold">
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
        <Link to="/">
          <motion.div
            initial={{ y: 15 }}
            animate={{ y: 1 }}
            transition={{ duration: 0.5 }}
            className=" group duration-300	 flex transition-all py-3 px-3 items-center cursor-pointer"
          >
            <AiOutlineHome className="transition-all mr-3 group-hover:text-white text-gray-400 text-3xl" />
            <p className="transition-all group-hover:text-white text-gray-400">
              Home
            </p>
          </motion.div>
        </Link>

        <Link to="/search">
          <motion.div
            initial={{ y: 15 }}
            animate={{ y: 1 }}
            transition={{ duration: 0.5 }}
            className="group duration-300 cursor-pointer transition-all  py-3 px-3 flex items-center"
          >
            <AiOutlineSearch className="transition-all mr-3 group-hover:text-white text-gray-400 text-3xl" />
            <p className="transition-all group-hover:text-white text-gray-400">
              Search
            </p>
          </motion.div>
        </Link>

        <Link to="/collection/playlist">
          <motion.div
            initial={{ y: 15 }}
            animate={{ y: 1 }}
            transition={{ duration: 0.5 }}
            className="duration-300 cursor-pointer group flex transition-all py-3 px-3 items-center"
          >
            <VscLibrary className="transition-all mr-3 group-hover:text-white text-gray-400 text-3xl" />
            <p className="transition-all group-hover:text-white text-gray-400">
              library
            </p>
          </motion.div>
        </Link>
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
