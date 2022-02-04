import React, { useEffect, useState } from "react";
import { VscLibrary } from "react-icons/vsc";
import { AiOutlineSearch, AiOutlineHome } from "react-icons/ai";
import Spotify from "spotify-web-api-js";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

var s = new Spotify();
function Sidebar() {
  const [playlists, setPlaylist] = useState([]);

  const location = useLocation();
  console.log("🔥 ", location.pathname);

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
        <Link exact to="/">
          <Item active={location.pathname === "/"} whileTap={{ scale: 0.95 }}>
            {location.pathname === "/" ? (
              <svg height="24" width="24" viewBox="0 0 24 24">
                <path d="M13.5 1.515a3 3 0 00-3 0L3 5.845a2 2 0 00-1 1.732V21a1 1 0 001 1h6a1 1 0 001-1v-6h4v6a1 1 0 001 1h6a1 1 0 001-1V7.577a2 2 0 00-1-1.732l-7.5-4.33z"></path>
              </svg>
            ) : (
              <svg
                role="img"
                height="24"
                width="24"
                class="Svg-sc-1bi12j5-0 hDgDGI home-icon"
                viewBox="0 0 24 24"
              >
                <path d="M12.5 3.247a1 1 0 00-1 0L4 7.577V20h4.5v-6a1 1 0 011-1h5a1 1 0 011 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 013 0l7.5 4.33a2 2 0 011 1.732V21a1 1 0 01-1 1h-6.5a1 1 0 01-1-1v-6h-3v6a1 1 0 01-1 1H3a1 1 0 01-1-1V7.577a2 2 0 011-1.732l7.5-4.33z"></path>
              </svg>
            )}

            <p>Home</p>
          </Item>
        </Link>

        <Link to="/search">
          <Item
            active={location.pathname === "/search"}
            whileTap={{ scale: 0.95 }}
          >
            {location.pathname === "/search" ? (
              <svg
                role="img"
                height="24"
                width="24"
                class="Svg-sc-1bi12j5-0 hDgDGI search-active-icon"
                viewBox="0 0 24 24"
              >
                <path d="M15.356 10.558c0 2.623-2.16 4.75-4.823 4.75-2.664 0-4.824-2.127-4.824-4.75s2.16-4.75 4.824-4.75c2.664 0 4.823 2.127 4.823 4.75z"></path>
                <path d="M1.126 10.558c0-5.14 4.226-9.28 9.407-9.28 5.18 0 9.407 4.14 9.407 9.28a9.157 9.157 0 01-2.077 5.816l4.344 4.344a1 1 0 01-1.414 1.414l-4.353-4.353a9.454 9.454 0 01-5.907 2.058c-5.18 0-9.407-4.14-9.407-9.28zm9.407-7.28c-4.105 0-7.407 3.274-7.407 7.28s3.302 7.279 7.407 7.279 7.407-3.273 7.407-7.28c0-4.005-3.302-7.278-7.407-7.278z"></path>
              </svg>
            ) : (
              <svg role="img" height="24" width="24" viewBox="0 0 24 24">
                <path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 101.414-1.414l-4.344-4.344a9.157 9.157 0 002.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z"></path>
              </svg>
            )}

            <p>Search</p>
          </Item>
        </Link>
        <Link to="/library">
          <Item
            active={location.pathname === "/library"}
            whileTap={{ scale: 0.95 }}
          >
            <VscLibrary fontSize="1.5rem" />
            <p>Library</p>
          </Item>
        </Link>
      </Menu>

      {/* liked songs */}
      <Link to="/collection/tracks">
        <LikedSongs active={location.pathname === "/collection/tracks"}>
          <div className="square">
            <svg
              role="img"
              height="12"
              width="12"
              aria-hidden="true"
              viewBox="0 0 16 16"
              class="Svg-sc-1bi12j5-0 hDgDGI"
            >
              <path d="M15.724 4.22A4.313 4.313 0 0012.192.814a4.269 4.269 0 00-3.622 1.13.837.837 0 01-1.14 0 4.272 4.272 0 00-6.21 5.855l5.916 7.05a1.128 1.128 0 001.727 0l5.916-7.05a4.228 4.228 0 00.945-3.577z"></path>
            </svg>
          </div>
          <p className="text-gray-400 ">Liked songs</p>
        </LikedSongs>
      </Link>
      {/* playlist */}
      <Playlist>
        {playlists.map((playlist) => (
          <Wrap
            active={location.pathname === `/playlist/${playlist.id}`}
            key={playlist?.id}
            className="playlist py-2"
          >
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
  display: flex;
  flex-direction: column;
  @media (max-width: 700px) {
    display: none;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const Logo = styled.div`
  padding: 1rem 1rem 0.6rem 1rem;
  img {
    object-fit: contain;
    height: 2.6rem;
    margin-left: 0.5rem;
  }
`;
const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem 0.6rem;
  color: #fff;
  .active {
    color: #1ed760;
    background-color: #282828;
    opacity: 1;
    font-weight: bold;
    border-radius: 5px;
  }
  a {
    text-decoration: none;
    opacity: 0.8;
  }
`;

const Item = styled(motion.div)`
  ${({ active }) =>
    active &&
    `
    background-color: #282828;
    font-weight: bold;
    `}
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  border-radius: 5px;
  color: ${({ active }) => (active ? "#1ed760" : "#b3b3b3")};
  svg {
    fill: ${({ active }) => (active ? "#1ed760" : "#b3b3b3")};
  }
`;

const LikedSongs = styled(motion.div)`
  display: flex;
  align-items: center;
  margin: 0 1.5rem;
  padding: 1rem 0;
  border-bottom: 1px solid #b3b3b3;
  color: ${({ active }) => (active ? "#fff" : "#b3b3b3")};
  gap: 0.8rem;
  .square {
    width: 2rem;
    height: 2rem;
    background: linear-gradient(135deg, #450af5, #c4efd9);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: ${({ active }) => (active ? "1" : "0.5")};
    svg {
      fill: #fff;
    }
  }
  p {
  }
`;

const Playlist = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem 0;
`;
const Wrap = styled.div`
  padding: 0 1.5rem;
  a {
    color: ${({ active }) => (active ? "#fff" : "#b3b3b3")};
    font-size: 1rem;
    &:hover {
      color: #fff;
    }
  }
`;
