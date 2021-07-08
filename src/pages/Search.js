import React, { useEffect, useState } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { s } from "../instance";
import { Link } from "react-router-dom";
import { selectSearchTerm, setSearchTerm } from "../features/songSlice";
import { useDispatch, useSelector } from "react-redux";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { selectUser } from "../features/userSlice";
import styled from "styled-components";

function Search() {
  const searchTerm = useSelector(selectSearchTerm);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [result, setResult] = useState({});
  useEffect(() => {
    s.search(
      searchTerm,
      ["album", "artist", "playlist", "track"],
      (err, data) => {
        setResult(data);
      }
    );
  }, [searchTerm]);
  const history = useHistory();

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }
  return (
    <Container>
      <Header>
        {/* nav arrow */}
        <div className="nav__arrow">
          <MdNavigateBefore
            onClick={() => history.goBack()}
            className="m-2 icon text-white rounded-full bg-transparent-rgba text-4xl"
          />
          <MdNavigateNext
            onClick={() => history.goForward()}
            className="m-2 icon text-white rounded-full bg-transparent-rgba text-4xl"
          />
        </div>

        {/* search bar */}
        <div className="search__bar">
          <BsSearch className="icon text-black text-2xl" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            className="px-3 py-2 focus:outline-none border-none"
            placeholder="search..."
          />
        </div>

        {/* user Info */}
        <div className="user__info">
          <div>
            <IoPersonCircleOutline className="icon text-3xl" />
          </div>
          <p className="sm:block hidden mt-3 font-semibold">
            {user?.display_name}
          </p>
          <div className="sm:block hidden">
            <IoMdArrowDropdown className="icon text-3xl" />
          </div>
        </div>
      </Header>

      <h1
        style={{ display: `${searchTerm ? "none" : "block"}`, padding: "10px" }}
      >
        Search for Tracks, Artists, Albums ...
      </h1>
      {/* body */}
      <div style={{ display: `${!searchTerm ? "none" : "block"}` }}>
        {/* Songs */}
        <Songs>
          <h1 className="sm:text-4xl text-2xl px-3 font-sans text-white font-bold ">
            Songs
          </h1>
          <div className="container">
            {result?.tracks?.items?.map((song) => (
              <div
                whileTap={{ scale: 0.9 }}
                onClick={() => s.play({ uris: [`spotify:track:${song?.id}`] })}
                className="wrap cursor-pointer flex justify-between p-3"
              >
                <div className="wrap__title">
                  <img
                    className="h-14 mr-4"
                    src={song.album.images[0].url}
                    alt=""
                  />
                  <div className="flex justify-center flex-col">
                    <p className="mb-1 sm:text-base text-md">{song.name}</p>
                    <span>
                      {song?.artists
                        .map(function (a) {
                          return a.name;
                        })
                        .join(",")}
                    </span>
                  </div>
                </div>
                <p>{millisToMinutesAndSeconds(song.duration_ms)}</p>
              </div>
            ))}
          </div>
        </Songs>

        {/* artist */}
        <Artists>
          <h1 className="text-2xl sm:text-4xl px-3  font-sans text-white font-bold ">
            Artists
          </h1>
          <div className="artists__flex">
            {result?.artists?.items?.map((a) => (
              <div className="wrap transition-all rounded-lg duration-300 hover:bg-transparent-rgba2 p-3 flex flex-col m-3 space-y-3">
                <div className="ImgContainer">
                  <img
                    className="object-cover"
                    src={
                      a.images.length === 0
                        ? "/images/spotify-dummy.png"
                        : a.images[0]?.url
                    }
                    alt=""
                  />
                </div>
                <p className="text-white">{a.name}</p>
                <span className="text-gray-400">
                  {a.type.charAt(0).toUpperCase() + a.type.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </Artists>

        {/* albums */}
        <Albums>
          <h1 className="px-5 text-2xl sm:text-4xl font-sans text-white font-bold ">
            Albums
          </h1>
          {/* grid */}
          <div className="albums__flex">
            {result?.albums?.items?.map((a) => (
              <Link to={`/album/${a.id}`}>
                <div className="wrap hover:bg-black p-5 ">
                  <img
                    className="h-full w-full object-cover"
                    src={a.images[0].url}
                    alt=""
                  />

                  <p className="mt-3 text-white font-semibold">{a.name}</p>
                  <span className="">
                    {a.artists
                      .map((a) => {
                        return a.name;
                      })
                      .join(",")}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Albums>
      </div>
    </Container>
  );
}

export default Search;

const Container = styled.div`
  background-color: #191919;
  color: #fff;
  flex: 1;
  overflow-y: scroll;
  height: 100vh;
  padding-bottom: 80px;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  .nav__arrow {
    margin-right: 10px;
    .icon {
      font-size: 30px;
    }
  }
  .search__bar {
    display: flex;
    background-color: #fff;
    align-items: center;
    border-radius: 99px;
    overflow: hidden;
    .icon {
      color: black;
      margin-left: 10px;
    }
    input {
      padding: 10px 15px;
      outline: none;
      border: none;
    }
  }
  .user__info {
    margin-left: auto;
    padding: 10px;
    align-items: center;
    display: flex;
    .icon {
      font-size: 30px;
    }
    p {
      margin: 0 10px 5px 10px;
    }
  }
`;

const Songs = styled.div`
  h1 {
    padding: 10px;
  }
  .container {
    display: flex;
    flex-direction: column;
    .wrap {
      display: flex;
      cursor: pointer;
      padding: 10px 20px;
      justify-content: space-between;
      .wrap__title {
        display: flex;
        img {
          height: 50px;
          margin-right: 10px;
        }
        p {
          font-weight: bold;
        }
        span {
          font-size: 14px;
          color: gray;
        }
      }
    }
  }
`;
const Artists = styled.div`
  margin-top: 20px;
  h1 {
    padding: 10px;
  }
  .artists__flex {
    display: flex;
    overflow-x: scroll;
    overflow-y: hidden;
    &::-webkit-scrollbar {
      display: none;
    }
    .wrap {
      padding: 20px;
      margin: 10px;
      &:hover {
        background-color: rgba(0, 0, 0, 0.8);
      }
      p {
        font-weight: 800;
      }
      span {
        color: grey;
      }
      .ImgContainer {
        width: 200px;
        height: 200px;
        border-radius: 99px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
`;
const Albums = styled.div`
  margin-top: 20px;
  h1 {
    padding: 10px;
  }
  .albums__flex {
    display: flex;
    overflow-x: scroll;
    overflow-y: hidden;
    &::-webkit-scrollbar {
      display: none;
    }
    a {
      text-decoration: none;
    }
    .wrap {
      margin: 10px;
      padding: 20px;
      &:hover {
        background-color: rgba(0, 0, 0, 0.8);
      }
      img {
        height: 180px;
      }
      p {
        color: #fff;
        font-weight: bold;
      }
      span {
        color: grey;
        font-size: 14px;
      }
    }
  }
`;
