import React, { useEffect, useState } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { motion } from "framer-motion";
import { IoMdPerson } from "react-icons/io";
import moment from "moment";
import { BsFillPlayFill } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";
import { AiFillPlayCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import { selectInstance } from "../features/userSlice";
function LikedSongs({ s }) {
  const [liked, setLiked] = useState([]);
  console.log("instance 🚀 ", s);
  const [user, setUser] = useState(null);

  useEffect(() => {
    s.getMySavedTracks((err, data) => {
      console.log("liked ", data);
      setLiked(data?.items);
    });

    s.getMe().then((user) => {
      console.log("user 🚀 ", user);
      setUser(user);
    });
  }, []);

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }
  return (
    <div className="main flex-1 h-screen overflow-scroll  bg-spotify-black ">
      {/* header */}
      <div
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
      <div className="h-96 w-full bg-gradient-to-b relative from-indigo-600 ">
        <div className="items-center flex absolute bottom-10 left-10">
          <img
            className="h-32 w-32 mr-5 items-end"
            src="/images/liked.jpeg"
            alt=""
          />
          <div className="flex flex-col justify-center text-white">
            <p className="text-sm -mb-4 font-semibold">PLAYLIST</p>
            <h1 className="text-6xl font-sans text-white font-bold ">
              Liked songs
            </h1>
            <p className="text-sm font-semibold">
              {user?.display_name}{" "}
              <span className="text-gray-400 ml-3">{liked?.length} songs</span>{" "}
            </p>
          </div>
        </div>
      </div>

      {/* play button */}
      <div className="flex items-center pl-6 ">
        <motion.div
          className="mr-5 flex justify-center rounded-full  bg-spotify-green w-20 h-20 items-center"
          whileTap={{ scale: 0.9 }}
        >
          <BsFillPlayFill className="text-white text-5xl " />
        </motion.div>

        <BsThreeDots className="hover:text-white text-gray-500 text-5xl" />
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
            {liked?.map((l, index) => (
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
                      src={l.track.album.images[0].url}
                      alt=""
                    />
                    <div className="flex justify-center flex-col">
                      <p className="mb-1">{l.track.name}</p>
                      <p className="text-gray-400">{l.track.artists[0].name}</p>
                    </div>
                  </div>
                </td>
                <td className="sm:block hidden">{l.track.album.name}</td>
                <td className="">{moment().startOf(l.added_at).fromNow()}</td>
                <td>{millisToMinutesAndSeconds(l.track.duration_ms)}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LikedSongs;
