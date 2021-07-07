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
      className={`px-2 pb-32 overflow-scroll  text-white bg-spotify-black flex-1 h-screen`}
    >
      <Header show={show} />
      <h1 className="text-white font-bold tracking-wider px-2">New Releases</h1>

      {/*  */}
      <div className="grid xl:grid-cols-5 gap-2 sm:gap-5 lg:grid-cols-4 sm:grid-cols-3  grid-cols-2">
        <LazyMotion features={domAnimation}>
          {newReleases?.map((n, index) => (
            <Link key={index} to={`/album/${n.id}`}>
              <motion.div
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="group duration-300 transition-all p-3 sm:p-6 hover:bg-transparent-rgba"
              >
                <div className="rounded-md relative overflow-hidden">
                  <img className="" src={n.images[0].url} alt="" />
                  <motion.div
                    whileTap={{ scale: 0.7 }}
                    className="mr-5 animate-fade-in-down duration-100 transition-all duration-400 absolute bottom-1 -right-4 hidden group-hover:flex justify-center rounded-full  bg-spotify-green w-12 h-12 items-center"
                  >
                    <BsFillPlayFill className="text-white text-3xl " />
                  </motion.div>
                </div>

                <p className="text-white line-clamp-2 mt-3 font-semibold">
                  {n.name}
                </p>
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
