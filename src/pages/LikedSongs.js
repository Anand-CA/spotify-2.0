import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BsThreeDots } from "react-icons/bs";
import { s } from "../instance";
import Header from "../components/Header";
import styled from "styled-components";
import { AiFillPlayCircle } from "react-icons/ai";

function LikedSongs() {
  const [liked, setLiked] = useState([]);
  useEffect(() => {
    s.getMySavedTracks((err, data) => {
      setLiked(data?.items);
    });
  }, []);

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }
  return (
    <Container>
      <Header />
      {/* banner */}
      <Banner>
        <motion.img
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 1 }}
          transition={{ ease: "easeInOut", duration: 0.4 }}
          src="/images/liked.jpeg"
          alt=""
        />
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: -3 }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            className="text-sm font-semibold"
          >
            PLAYLIST
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: -3 }}
            transition={{ ease: "easeInOut", duration: 0.6 }}
            className="text-6xl font-sans text-white font-bold "
          >
            Liked songs
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: -3 }}
            transition={{ ease: "easeInOut", duration: 0.7 }}
            className="text-sm font-semibold"
          >
            <span className="text-gray-400 ml-3">{liked?.length} songs</span>{" "}
          </motion.p>
        </div>
      </Banner>
      {/* play button */}
      <Controls>
        <motion.div
          className="mr-5 flex justify-center rounded-full  bg-spotify-green w-20 h-20 items-center"
          whileTap={{ scale: 0.9 }}
        >
          <AiFillPlayCircle className="icon text-white text-5xl " />
        </motion.div>

        <BsThreeDots className="hover:text-white text-gray-500 text-5xl" />
      </Controls>

      {/* table */}
      <div className="table__container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>TITLE</th>
              <th className="sm:block hidden">ALBUM</th>
              <th>DURATION</th>
            </tr>
          </thead>

          <tbody>
            {liked?.map((l, index) => (
              <motion.tr
                onClick={() =>
                  s.play({ uris: [`spotify:track:${l.track.id}`] })
                }
                whileTap={{ scale: 0.9 }}
                initial={{ scale: 0.6 }}
                animate={{ scale: 1 }}
                transition={{ ease: "easeInOut", duration: 0.1 }}
                className="wrap cursor-pointer transition-all duration-200 hover:bg-transparent-rgba"
              >
                <td>{index + 1}</td>
                <td>
                  <div className="wrap__title flex">
                    <img
                      className="h-14 mr-4"
                      src={l.track.album.images[0].url}
                      alt=""
                    />
                    <div className="flex justify-center flex-col">
                      <p className="mb-1">{l.track.name}</p>
                      <span className="text-gray-400">
                        {l.track.artists[0].name}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="sm:block hidden">{l.track.album.name}</td>
                <td>{millisToMinutesAndSeconds(l.track.duration_ms)}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}

export default LikedSongs;

const Container = styled.div`
  color: #fff;
  padding-bottom: 100px;
  background-color: #191919;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  .table__container {
    padding: 10px;
    table {
      width: 100%;
      border-collapse: collapse;
      th,
      td {
        padding: 10px;
        text-align: left;
        @media (max-width: 600px) {
          padding: 10px 3px;
        }
      }
      @media (max-width: 600px) {
        th {
          font-size: 10px;
        }
        td {
          font-size: 13px;
        }
      }
      .wrap {
        cursor: pointer;
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        &:hover {
          background-color: rgba(0, 0, 0, 0.8);
        }
        img {
          height: 50px;
          margin-right: 10px;
        }
        .wrap__title {
          display: flex;
          align-items: center;
          p {
            font-weight: bold;
          }
          span {
            font-size: 14px;
            color: gray;
          }
        }
      }
    }
  }
`;
const Banner = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 7rem 2rem;
  img {
    height: 150px;
    object-fit: contain;
  }
  h1 {
    font-size: 50px;
  }
  background-image: linear-gradient(rgb(79, 70, 229), #191919);
  position: relative;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #191919 100%);
  }
`;
const Controls = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
  .icon {
    font-size: 60px;
    color: #1db954;
  }
`;
