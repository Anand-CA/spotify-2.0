import React, { useEffect, useState } from "react";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import Spotify from "spotify-web-api-js";
import { Link } from "react-router-dom";
import { Header, Image, Label, Icon, Table } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import moment from "moment";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { GrFormPrevious, GrFormNext, GrPrevious } from "react-icons/gr";
import SkeletonImage from "antd/lib/skeleton/Image";
import "./Main.css";
import { motion } from "framer-motion";
import { IoMdPerson } from "react-icons/io";
import { IconContext } from "react-icons/lib";
var s = new Spotify();

function Main() {
  const { id } = useParams();
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [playlist, setPlaylist] = useState([]);
  console.log("id", id);
  const [show, setShow] = useState(false);

  useEffect(() => {
    document.querySelector(".main").addEventListener("scroll", handleScroll);
  }, []);
  console.log(show);
  useEffect(() => {
    console.log("hello");
    s.getPlaylist(id).then(
      function (data) {
        console.log("User playlistsss", data);
        setImage(data.images[0].url);
        setName(data.name);
        setPlaylist(data.tracks.items);
      },
      function (err) {
        console.error(err);
      }
    );
    s.getMyCurrentPlayingTrack().then((res) => {
      console.log(res);
    });
    s.getMySavedTracks((err, data) => {
      console.log("liked ", data);
    });
  }, [id]);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }
  return (
    <div
      onScroll={handleScroll}
      className="main flex-1 h-screen overflow-scroll  bg-spotify-black "
    >
      {/* header */}
      <div
        style={{ backgroundColor: `${show && "black"}` }}
        className={`-mb-20  flex items-center py-2 sticky right-0 bg-transparent top-0 z-10 w-full`}
      >
        {/* icons */}
        <div className="flex flex-1">
          <MdNavigateBefore className="m-2 text-white rounded-full bg-transparent-rgba text-4xl" />
          <MdNavigateNext className="m-2 text-white rounded-full bg-transparent-rgba text-4xl" />
        </div>

        <div className="flex">
          <motion.button
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mr-3 bg-transparent-rgba py-2 px-7 border border-gray-200 rounded-full "
          >
            <p className="text-gray-200 ">UPGRADE</p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-transparent-rgba items-center space-x-2 flex py-2 px-7 border border-gray-200 rounded-full "
          >
            <IoMdPerson className="text-3xl text-white bg-gray-800  rounded-full" />
            <p className="text-gray-200 ">UPGRADE</p>
          </motion.button>
        </div>
      </div>
      {/* banner */}
      <div className="h-96 w-full bg-gradient-to-b relative from-red-500 ">
        <div className="flex absolute bottom-10 left-10">
          <img className="h-32 w-32 mr-5 items-end" src={image} alt="" />
          <h1 className="text-6xl font-sans text-white font-bold ">{name}</h1>
        </div>
      </div>

      {/* table */}
      <div className="p-2 sm:p-5 ">
        <table className="w-full text-white ">
          <thead>
            <tr>
              <th>#</th>
              <th>TITLE</th>
              <th className="sm:block hidden">ALBUM</th>
              <th className="">DATE ADDED</th>
              <th>DURATION</th>
            </tr>
          </thead>

          <tbody>
            {playlist.map((p, index) => (
              <motion.tr
                initial={{ scale: 0.6 }}
                animate={{ scale: 1 }}
                transition={{ ease: "easeInOut", duration: 0.1 }}
                className="transition-all duration-200 hover:bg-transparent-rgba"
              >
                <td>{index + 1}</td>
                <td>
                  <div className="flex">
                    <img
                      className="h-14 mr-4"
                      src={p.track.album.images[0].url}
                      alt=""
                    />
                    <div className="flex justify-center flex-col">
                      <p className="mb-1">{p.track.name}</p>
                      <p className="text-gray-400">{p.track.artists[0].name}</p>
                    </div>
                  </div>
                </td>
                <td className="sm:block hidden">{p.track.album.name}</td>
                <td className="">{moment().startOf(p.added_at).fromNow()}</td>
                <td>{millisToMinutesAndSeconds(p.track.duration_ms)}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Main;
