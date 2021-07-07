import { motion } from "framer-motion";
import React from "react";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { useSelector } from "react-redux";
import { selectCurrentPlayTrack } from "../features/songSlice";
import { s } from "../instance";
import Slider from "./Slider";
function Details({ artistImg, img, title }) {
  const currentPlayTrack = useSelector(selectCurrentPlayTrack);

  const handlePlay = () => {
    if (currentPlayTrack.paused) {
      s.play();
    } else {
      s.pause();
    }
  };
  return (
    <div
      style={{
        background: `url(${artistImg}) no-repeat center center /cover`,
      }}
      className="h-full pl-32 pt-32 details"
    >
      <div className="contents z-10 absolute">
        {/* image */}
        <img src={img} alt="" />
        <p className="text-8xl font-bold">{title}</p>

        <div>
          <div className="item-center flex space-x-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => s.skipToPrevious()}
            >
              <MdSkipPrevious className="text-4xl text-gray-400" />
            </motion.button>
            <motion.button whileTap={{ scale: 0.9 }} onClick={handlePlay}>
              {!currentPlayTrack.paused ? (
                <AiFillPauseCircle className="text-5xl  text-black" />
              ) : (
                <AiFillPlayCircle className="text-5xl text-black" />
              )}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => s.skipToNext()}
            >
              <MdSkipNext className="text-4xl text-gray-400" />
            </motion.button>
          </div>

          <Slider />
        </div>
      </div>
    </div>
  );
}

export default Details;
