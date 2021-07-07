import React, { useEffect, useState } from "react";
import { MdNavigateBefore, MdNavigateNext, MdPerson } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import "antd/dist/antd.css";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { s } from "../instance";
import { Link } from "react-router-dom";
import { selectSearchTerm, setSearchTerm } from "../features/songSlice";
import { useDispatch, useSelector } from "react-redux";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { selectUser } from "../features/userSlice";
function Search() {
  const searchTerm = useSelector(selectSearchTerm);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [result, setResult] = useState({});
  console.log("result >>>", result);
  useEffect(() => {
    s.search(
      searchTerm,
      ["album", "artist", "playlist", "track"],
      (err, data) => {
        setResult(data);
      }
    );
  }, [searchTerm]);
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a href="https://www.antgroup.com">1st menu item</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="https://www.aliyun.com">2nd menu item</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
  );
  const history = useHistory();

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }
  return (
    <div className="pb-32 sm:px-2 bg-spotify-black flex-1 h-screen overflow-y-scroll">
      {/* header */}
      <div className="py-2 sticky top-0 bg-spotify-black flex items-center">
        {/* nav arrow */}
        <div className="flex">
          <MdNavigateBefore
            onClick={() => history.goBack()}
            className="m-2 text-white rounded-full bg-transparent-rgba text-4xl"
          />
          <MdNavigateNext
            onClick={() => history.goForward()}
            className="m-2 text-white rounded-full bg-transparent-rgba text-4xl"
          />
        </div>

        {/* search bar */}
        <div className="bg-white mr-3 max-w-sm w-full flex items-center rounded-full px-3 overflow-hidden">
          <BsSearch className=" text-black text-2xl" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            className="px-3 py-2 focus:outline-none border-none"
            placeholder="search..."
          />
        </div>

        {/* user Info */}
        <div className="flex text-white ml-auto">
          <div className="flex space-x-1 items-center">
            <div>
              <IoPersonCircleOutline className="text-3xl" />
            </div>
            <p className="sm:block hidden mt-3 font-semibold">
              {user?.display_name}
            </p>
            <div className="sm:block hidden">
              <IoMdArrowDropdown className="text-3xl" />
            </div>
          </div>
        </div>
      </div>

      <h1
        className={`sm:text-3xl ${
          searchTerm && "hidden"
        } text-white font-bold p-5`}
      >
        Search for Tracks, Artists, Albums ...
      </h1>
      {/* body */}
      <div
        style={{ display: `${!searchTerm ? "none" : "block"}` }}
        className={`text-white`}
      >
        {/* Songs */}
        <div>
          <h1 className="sm:text-4xl text-2xl px-3 font-sans text-white font-bold ">
            Songs
          </h1>
          <div>
            {result?.tracks?.items?.map((song) => (
              <div
                whileTap={{ scale: 0.9 }}
                onClick={() => s.play({ uris: [`spotify:track:${song?.id}`] })}
                className="cursor-pointer flex justify-between p-3"
              >
                <div className="flex">
                  <img
                    className="h-14 mr-4"
                    src={song.album.images[0].url}
                    alt=""
                  />
                  <div className="flex justify-center flex-col">
                    <p className="mb-1 sm:text-base text-md">{song.name}</p>
                    <div className="flex text-gray-400 text-xs">
                      {song?.artists
                        .map(function (a) {
                          return a.name;
                        })
                        .join(",")}
                    </div>
                  </div>
                </div>
                <p>{millisToMinutesAndSeconds(song.duration_ms)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* artist */}
        <div className="mt-5">
          <h1 className="text-2xl sm:text-4xl px-3  font-sans text-white font-bold ">
            Artists
          </h1>
          <div className="flex overflow-x-scroll w-full">
            {result?.artists?.items?.map((a) => (
              <div className="transition-all rounded-lg duration-300 hover:bg-transparent-rgba2 p-3 flex flex-col m-3 space-y-3">
                <div className="h-52  w-52 rounded-full overflow-hidden">
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
                <h4 className="text-white">{a.name}</h4>
                <p className="text-gray-400">
                  {a.type.charAt(0).toUpperCase() + a.type.slice(1)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* albums */}
        <div className="overflow-x-scroll mt-5 overflow-y-hidden">
          <h1 className="px-5 text-2xl sm:text-4xl font-sans text-white font-bold ">
            Albums
          </h1>
          {/* grid */}
          <div className="p-5 flex">
            {result?.albums?.items?.map((a) => (
              <Link to={`/album/${a.id}`}>
                <div className=" hover:bg-black p-5 ">
                  <div className="h-44 w-44 ">
                    <img
                      className="h-full w-full object-cover"
                      src={a.images[0].url}
                      alt=""
                    />
                  </div>
                  <p className="mt-3 text-white font-semibold">{a.name}</p>
                  <div className="text-sm text-gray-400">
                    {a.artists
                      .map((a) => {
                        return a.name;
                      })
                      .join(",")}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
