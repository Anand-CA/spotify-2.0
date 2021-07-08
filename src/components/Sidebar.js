import React, { useEffect, useState } from "react";
import { VscLibrary } from "react-icons/vsc";
import { AiOutlineSearch, AiOutlineHome } from "react-icons/ai";
import Spotify from "spotify-web-api-js";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";

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
    <Container>
      {/* logo */}
      <Logo>
        <Link to="/">
          <motion.img
            initial={{ y: -15 }}
            animate={{ y: 1 }}
            transition={{ duration: 0.5 }}
            className="sidebar__logo"
            src="/images/Spotify_Logo_RGB_White.svg"
            alt=""
          />
        </Link>
      </Logo>

      {/* menu */}
      <Menu>
        <NavLink exact activeClassName="active" to="/">
          <motion.div
            initial={{ y: 15 }}
            animate={{ y: 1 }}
            className="sidebar__menu flex  py-3 px-3 items-center cursor-pointer"
          >
            <AiOutlineHome className="sidebarMenu__icon mr-3  text-3xl" />
            <p className="">Home</p>
          </motion.div>
        </NavLink>

        <NavLink exact activeClassName="active" to="/search">
          <motion.div
            initial={{ y: 15 }}
            animate={{ y: 1 }}
            className="sidebar__menu cursor-pointer  py-3 px-3 flex items-center"
          >
            <AiOutlineSearch className="sidebarMenu__icon mr-3  text-3xl" />
            <p className="">Search</p>
          </motion.div>
        </NavLink>

        <motion.div
          initial={{ y: 15 }}
          animate={{ y: 1 }}
          className="sidebar__menu cursor-pointer  flex  py-3 px-3 items-center"
        >
          <VscLibrary className="sidebarMenu__icon text-gray-400 mr-3   text-3xl" />
          <p className="text-gray-400">Library</p>
        </motion.div>
      </Menu>

      {/* liked songs */}
      <Link to="/collection/tracks">
        <LikedSongs>
          <img src="/images/liked.jpeg" alt="" />
          <p className="text-gray-400 ">Liked songs</p>
        </LikedSongs>
      </Link>
      {/* playlist */}
      <Playlist>
        {playlists.map((playlist) => (
          <Wrap key={playlist?.id} className="playlist py-2">
            <Link to={`/playlist/${playlist.id}`}>
              <p className="text-gray-400">{playlist.name}</p>
            </Link>
          </Wrap>
        ))}
      </Playlist>
    </Container>
  );
}

export default Sidebar;

const Container = styled.div`
  background-color: #121212;
  color: #fff;
  height: 100vh;
  width: 25vh;
  @media (max-width: 600px) {
    display: none;
  }
  a {
    text-decoration: none;
  }
`;

const Logo = styled.div`
  img {
    height: 60px;
  }
`;
const Menu = styled.div`
  .sidebarMenu__icon {
    margin-right: 10px;
    font-size: 25px;
  }
  .active {
    color: #1db954;
  }
  a {
    text-decoration: none;
    color: lightgrey;
  }
  .sidebar__menu {
    display: flex;
    align-items: center;
    padding: 10px;
    font-size: 17px;
  }
`;

const LikedSongs = styled.div`
  display: flex;
  padding: 30px 10px;
  align-items: center;
  border-bottom: 1px solid gray;
  img {
    height: 45px;
    margin-right: 10px;
  }
  p {
    color: lightgrey;
  }
`;
const Playlist = styled.div``;
const Wrap = styled.div`
  padding: 10px;
  a {
    text-decoration: none;
    color: #fff;
  }
`;
