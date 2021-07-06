import React, { useEffect, useState } from "react";
import { MdNavigateBefore, MdNavigateNext, MdPerson } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import "antd/dist/antd.css";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";

function Search({ s }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState({});
  useEffect(() => {
    s.search(
      searchTerm,
      ["album", "artist", "playlist", "track"],
      (err, data) => {
        console.log("🏵 ", data);
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
    <div className="bg-spotify-black flex-1 h-screen overflow-y-scroll">
      {/* header */}
      <div className="p-2  flex items-center">
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
        <div className="bg-white max-w-sm w-full flex items-center rounded-full px-3 overflow-hidden">
          <BsSearch className=" text-black text-2xl" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 focus:outline-none border-none"
            placeholder="search..."
          />
        </div>

        {/* user Info */}
        <div className="ml-auto space-x-3 flex items-center bg-black px-3 py-1 rounded-full">
          <div className="bg-gray-800 rounded-full p-2">
            <MdPerson className="text-2xl text-white " />
          </div>
          <Dropdown overlay={menu} trigger={["click"]}>
            <a
              className="text-white ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              densecDeveloper <DownOutlined />
            </a>
          </Dropdown>
        </div>
      </div>

      <h1
        className={`font-5xl ${searchTerm && "hidden"} text-white font-bold p-3`}
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
          <h1 className="text-4xl font-sans text-white font-bold ">Songs</h1>
          <div>
            {result?.tracks?.items?.map((song) => (
              <div className="flex justify-between p-3">
                <div className="flex">
                  <img
                    className="h-14 mr-4"
                    src={song.album.images[0].url}
                    alt=""
                  />
                  <div className="flex justify-center flex-col">
                    <p className="mb-1">{song.name}</p>
                    <div className="flex text-gray-400">
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
        <div>
          <h1 className="text-4xl font-sans text-white font-bold ">Artists</h1>
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
      </div>
    </div>
  );
}

export default Search;
