import React, { useEffect, useRef, useState } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { domAnimation, LazyMotion, motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { s } from "../instance";

function Home() {
  const [newReleases, setNewReleases] = useState([]);
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    s.getNewReleases((err, data) => {
      setNewReleases(data.albums.items);
    });
  }, []);

  const handleScroll = () => {
    if (ref.current.scrollTop > 240) {
      setShow(true);
    } else {
      setShow(false);
    }
  };
  return (
    <div
      ref={ref}
      onScroll={handleScroll}
      className={`px-2 ${
        show ? "bg-spotify-black" : "transparent"
      } overflow-scroll  text-white bg-spotify-black flex-1 h-screen`}
    >
      <Header />
      <h1 className="text-white">New Releases</h1>

      {/*  */}
      <div className="grid lg:grid-cols-4  grid-cols-4">
        <LazyMotion features={domAnimation}>
          {newReleases?.map((n, index) => (
            <Link key={index} to={`/album/${n.id}`}>
              <motion.div
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

                <p className="text-white line-clamp-2">{n.name}</p>
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
