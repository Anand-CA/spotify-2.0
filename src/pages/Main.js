import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import "semantic-ui-css/semantic.min.css";
import moment from "moment";
import "./Main.css";
import { motion } from "framer-motion";
import Header from "../components/Header";
import { setPlaying } from "../features/songSlice";
import { useDispatch } from "react-redux";
import { s } from "../instance";
import { AiFillPlayCircle } from "react-icons/ai";

function Main() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [playlistId, setPlaylistId] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [playlist, setPlaylist] = useState([]);
  const Ref = useRef(null);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = s.getPlaylist(id).then(
      function (data) {
        setPlaylistId(data?.id);
        setImage(data?.images[0]?.url);
        setName(data?.name);
        setPlaylist(data?.tracks?.items);
      },
      function (err) {
        console.error(err);
      }
    );

    return unsubscribe;
  }, [id]);
  const handleScroll = () => {
    if (Ref.current.scrollTop > 240) {
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

  const playTrack = (id) => {
    s.play({
      uris: [`spotify:track:${id}`],
    });
    dispatch(setPlaying(true));
  };
  return (
    <div
      ref={Ref}
      onScroll={handleScroll}
      className={`main pb-32 flex-1 h-screen overflow-scroll  bg-spotify-black `}
    >
      {/* header */}
      <Header show={show} />
      {/* banner */}
      <div className="-mt-20 h-96 w-full bg-gradient-to-b relative from-red-500 ">
        <div className="flex absolute bottom-10 left-10">
          <img
            className="h-32 w-32 mr-5 items-end object-contain"
            src={loading ? "/images/dummy-1.png" : image}
            alt=""
          />
          <motion.h1
            initial={{ y: 20 }}
            animate={{ y: -3 }}
            transition={{ ease: "easeInOut", duration: 0.7 }}
            className="text-6xl font-sans  text-white font-bold "
          >
            {name}
          </motion.h1>
        </div>
      </div>

      {/* play button */}
      <div className="flex items-center pl-6 ">
        <motion.button
          onClick={() =>
            s.play({ context_uri: `spotify:playlist:${playlistId}` })
          }
          className=""
          whileTap={{ scale: 0.9 }}
        >
          <AiFillPlayCircle className=" text-spotify-green text-8xl " />
        </motion.button>

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
            {playlist.map((p, index) => (
              <motion.tr
                key={index}
                onClick={() => playTrack(p.track.id)}
                initial={{ scale: 0.6 }}
                animate={{ scale: 1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ ease: "easeInOut", duration: 0.1 }}
                className="cursor-pointer transition-all duration-200 hover:bg-transparent-rgba"
              >
                <td>{index + 1}</td>
                <td>
                  <div className="flex">
                    <img
                      className="h-14 mr-4"
                      onLoad={() => setLoading(false)}
                      src={
                        loading
                          ? "/images/spotify-dummy.png"
                          : p.track.album.images[0].url
                      }
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
