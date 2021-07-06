import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Main from "./Main";
import Sidebar from "../components/Sidebar";
import { BsFillPlayFill } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";
import {
  AnimatePresence,
  domAnimation,
  LazyMotion,
  motion,
} from "framer-motion";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { s } from "../instance";

function Home() {
  const [newReleases, setNewReleases] = useState([]);

  useEffect(() => {
    s.getNewReleases((err, data) => {
      setNewReleases(data.albums.items);
    });
    s.getAudioFeaturesForTrack("63aj87TQG6F3RVO5nbG2VQ", (err, data) => {
      console.log("audio", data);
    });
  }, []);
  console.log("new releases 🚀 ", newReleases);
  return (
    <div className="px-2 overflow-scroll text-white bg-spotify-black flex-1 h-screen">
      <Header />
      <h1 className="text-white">New Releases</h1>

      {/*  */}
      <div className="grid lg:grid-cols-4  grid-cols-4">
        <LazyMotion features={domAnimation}>
          {newReleases?.map((n) => (
            <Link to={`/album/${n.id}`}>
              <motion.div
                key={n.id}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="group duration-300 transition-all p-4 hover:bg-transparent-rgba"
              >
                <div className="rounded-md relative overflow-hidden">
                  <img className="" src={n.images[0].url} alt="" />
                  <motion.div
                    whileTap={{ scale: 0.7 }}
                    className="mr-5 transition-all duration-400 absolute bottom-1 -right-4 hidden group-hover:flex justify-center rounded-full  bg-spotify-green w-12 h-12 items-center"
                  >
                    <BsFillPlayFill className="text-white text-3xl " />
                  </motion.div>
                </div>

                <p>{n.name}</p>
                <p className="text-gray-400">{n.artists[0].name}</p>
              </motion.div>
            </Link>
          ))}
        </LazyMotion>
      </div>
    </div>
  );
}

export default Home;
