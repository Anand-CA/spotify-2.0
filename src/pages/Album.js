import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { BsFillPlayFill } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";
import { motion } from "framer-motion";
import Header from "../components/Header";
import { s } from "../instance";
import styled from "styled-components";

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
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      ref={ref}
      onScroll={handleScroll}
      className="album"
    >
      {/* header */}
      <Header show={show} />
      {/* banner */}
      <div className="album__banner flex absolute bottom-10 left-10">
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.3 }}
          className="h-32 w-32 mr-5 items-end"
          src={img}
          alt=""
        />

        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: -3 }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            className="text-sm font-semibold"
          >
            ALBUMS
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: -3 }}
            transition={{ ease: "easeInOut", duration: 0.6 }}
            className="text-6xl font-sans text-white font-bold "
          >
            {album?.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: -3 }}
            transition={{ ease: "easeInOut", duration: 0.7 }}
            className="text-sm font-semibold"
          >
            <span className="text-gray-400 ml-3">
              {albumTracks?.length} songs
            </span>{" "}
          </motion.p>
        </div>
      </div>

      {/* play button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.7 }}
        className="album__controls"
      >
        <motion.div
          onClick={() => s.play({ context_uri: `spotify:album:${album?.id}` })}
          className="mr-5 flex justify-center rounded-full  bg-spotify-green w-20 h-20 items-center"
          whileTap={{ scale: 0.9 }}
        >
          <BsFillPlayFill className="album__icons text-white text-5xl " />
        </motion.div>

        <BsThreeDots
          className=""
          style={{ fontSize: "30px", color: "grey", marginLeft: "10px" }}
        />
      </motion.div>

      {/* table */}
      <div className="table__container">
        <table className="album__table">
          <tr>
            <th>#</th>
            <th>TITLE</th>
            <th>DURATION</th>
          </tr>

          <tbody>
            {albumTracks?.map((a, index) => (
              <motion.tr
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 1 }}
                transition={{ ease: "easeInOut", duration: index / 10 }}
                onClick={() => s.play({ uris: [`spotify:track:${a.id}`] })}
                className="wrap"
              >
                <td>{index + 1}</td>
                <td>
                  <p className="mb-1">{a.name}</p>
                </td>

                <td>{millisToMinutesAndSeconds(a.duration_ms)}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}

export default Album;

const Container = styled.div`
  flex: 1;
  color: #fff;
  background-color: #191919;
  overflow-y: scroll;
  height: 100vh;
  padding-bottom: 100px;

  &::-webkit-scrollbar {
    display: none;
  }
  .album__banner {
    padding: 20px;
    display: flex;
    align-items: center;
    height: 50vh;
    background-image: linear-gradient(rgb(5, 150, 105), #191919);
    @media (max-width: 600px) {
      height: 40vh;
    }
    div {
      text-align: left;
      h5 {
        font-size: 16px;
      }
      p {
        color: lightgrey;
        font-size: 14px;
      }
    }
    img {
      height: 250px;
      margin-right: 10px;
      @media (max-width: 600px) {
        height: 100px;
      }
    }
    h1 {
      font-weight: bold;
      font-size: 45px;
      @media (max-width: 600px) {
        font-size: 30px;
      }
    }
  }
  .album__controls {
    display: flex;
    padding: 10px;
    align-items: center;
    .album__icons {
      background-color: #1db954;
      font-size: 60px;
      border-radius: 99px;
      padding: 4px;
    }
  }
  .table__container {
    padding: 10px;
    @media (max-width: 600px) {
      padding: 0px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      .wrap {
        @media (max-width: 600px) {
          font-size: 0.875rem;
          line-height: 1.25rem;
        }
        cursor: pointer;
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        &:hover {
          background-color: rgba(0, 0, 0, 0.8);
        }
      }
      @media (max-width: 600px) {
        th {
          font-size: 0.875rem;
          line-height: 1.25rem;
        }
      }

      th,
      td {
        padding: 20px;
        text-align: left;
      }
    }
  }
`;
