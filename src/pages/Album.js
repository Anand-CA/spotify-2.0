import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { BsFillPlayFill } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";
import { motion } from "framer-motion";
import Header from "../components/Header";
import { s } from "../instance";

function Album() {
  const { id } = useParams();
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  const [img, setImg] = useState(null);
  const [album, setAlbum] = useState({});
  const [albumTracks, setAlbumTracks] = useState([]);
  useEffect(() => {
    s.getAlbum(id, (err, data) => {
      setAlbum(data);
      setImg(data.images[0].url);
    });
    s.getAlbumTracks(id, (err, data) => {
      setAlbumTracks(data.items);
    });
  }, [id]);

  const handleScroll = () => {
    if (ref.current.scrollTop > 240) {
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      ref={ref}
      onScroll={handleScroll}
      style={{ height: "100vh" }}
      className="pb-32 main relative flex-1  overflow-scroll  bg-spotify-black "
    >
      {/* header */}
      <Header show={show} />
      {/* banner */}
      <div className="-mt-20 h-96 w-full bg-gradient-to-b relative from-red-500 ">
        <div className="flex absolute bottom-10 left-10">
          <img className="h-32 w-32 mr-5 items-end" src={img} alt="" />
          <h1 className="text-6xl font-sans text-white font-bold ">
            {album?.name}
          </h1>
        </div>
      </div>

      {/* play button */}
      <div className="flex items-center pl-6 ">
        <motion.div
          onClick={() => s.play({ context_uri: `spotify:album:${album?.id}` })}
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

              <th>DURATION</th>
            </tr>
          </thead>

          <tbody>
            {albumTracks?.map((a, index) => (
              <motion.tr
                onClick={() => s.play({ uris: [`spotify:track:${a.id}`] })}
                initial={{ scale: 0.6 }}
                animate={{ scale: 1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ ease: "easeInOut", duration: 0.1 }}
                className="cursor-pointer transition-all duration-200 hover:bg-transparent-rgba"
              >
                <td>{index + 1}</td>
                <td>
                  <div className="flex">
                    <img className="h-14 mr-4" alt="" />
                    <div className="flex justify-center flex-col">
                      <p className="mb-1">{a.name}</p>
                      <p className="text-gray-400"></p>
                    </div>
                  </div>
                </td>

                <td>{millisToMinutesAndSeconds(a.duration_ms)}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export default Album;
