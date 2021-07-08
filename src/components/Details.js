import { motion } from "framer-motion";
import React from "react";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { useSelector } from "react-redux";
import { selectCurrentPlayTrack } from "../features/songSlice";
import { s } from "../instance";
import Slider from "./Slider";
import styled from "styled-components";

function Details({ visible, artistImg, img, title }) {
  const currentPlayTrack = useSelector(selectCurrentPlayTrack);

  const handlePlay = () => {
    if (currentPlayTrack.paused) {
      s.play();
    } else {
      s.pause();
    }
  };
  return (
    <Container
      style={{
        background: `url(${artistImg}) no-repeat center center /cover`,
        display: `${visible ? "block" : "none"}`,
      }}
    >
      <div className="contents">
        {/* image */}
        <img src={img} alt="" />
        <h1 className="text-8xl font-bold">{title}</h1>

        <div>
          <div className="icons__container item-center flex space-x-4">
            <motion.div
              whileTap={{ scale: 0.9 }}
              onClick={() => s.skipToPrevious()}
            >
              <MdSkipPrevious className="icons text-4xl text-gray-400" />
            </motion.div>
            <motion.div whileTap={{ scale: 0.9 }} onClick={handlePlay}>
              {!currentPlayTrack.paused ? (
                <AiFillPauseCircle className="icons text-5xl  text-black" />
              ) : (
                <AiFillPlayCircle className="icons text-5xl text-black" />
              )}
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.9 }}
              onClick={() => s.skipToNext()}
            >
              <MdSkipNext className="icons text-4xl text-gray-400" />
            </motion.div>
          </div>
          <div className="slider">
            <Slider />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Details;

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .contents {
    padding: 30px;
    display: flex;
    width: 100%;
    h1 {
      font-size: 50px;
    }
    .icons {
      font-size: 50px;
    }
    .icons__container {
      display: flex;
    }
    .slider {
      width: 400px;
    }
    height: 100%;
    justify-content: center;
    flex-direction: column;
    align-items: start;
  }
`;
