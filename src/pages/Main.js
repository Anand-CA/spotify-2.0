import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { motion } from "framer-motion";
import Header from "../components/Header";
import { setPlaying } from "../features/songSlice";
import { useDispatch } from "react-redux";
import { s } from "../instance";
import { AiFillPlayCircle } from "react-icons/ai";
import styled from "styled-components";

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
    <Container ref={Ref} onScroll={handleScroll}>
      {/* header */}
      <Header show={show} />
      {/* banner */}
      <div className="main__banner flex absolute bottom-10 left-10">
        <img
          className="h-32 w-32 mr-5 items-end object-contain"
          src={loading ? "/images/dummy-1.png" : image}
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
            {name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: -3 }}
            transition={{ ease: "easeInOut", duration: 0.7 }}
            className="text-sm font-semibold"
          >
            <span className="text-gray-400 ml-3">{playlist?.length} songs</span>
          </motion.p>
        </div>
      </div>

      {/* play button */}
      <div className="main__controls">
        <motion.div
          onClick={() =>
            s.play({ context_uri: `spotify:playlist:${playlistId}` })
          }
          className=""
          whileTap={{ scale: 0.9 }}
        >
          <AiFillPlayCircle className="main__icons " />
        </motion.div>

        <BsThreeDots className="" />
      </div>

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
            {playlist.map((p, index) => (
              <motion.tr
                key={index}
                whileTap={{ scale: 0.9 }}
                initial={{ scale: 0.6 }}
                animate={{ scale: 1 }}
                transition={{ ease: "easeInOut", duration: 0.1 }}
                onClick={() => playTrack(p.track.id)}
                className="wrap "
              >
                <td>{index + 1}</td>
                <td className="wrap__title">
                  <img
                    className="wrap__image"
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
                    <span className="text-gray-400">
                      {p.track.artists[0].name}
                    </span>
                  </div>
                </td>
                <td className="sm:block hidden">{p.track.album.name}</td>
                <td>{millisToMinutesAndSeconds(p.track.duration_ms)}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}

export default Main;

const Container = styled.div`
  flex: 1;
  height: 100vh;
  overflow-y: scroll;
  color: #fff;
  padding-bottom: 100px;
  background-color: #191919;
  &::-webkit-scrollbar {
    display: none;
  }
  .main__banner {
    padding: 10px;
    height: 50vh;
    display: flex;
    align-items: center;
    @media (max-width: 600px) {
      height: 40vh;
    }
    background-image: linear-gradient(rgb(220, 38, 38), #191919);
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
    }
  }
  .main__controls {
    display: flex;
    padding: 10px;
    align-items: center;
    .main__icons {
      font-size: 70px;
      border-radius: 99px;
      color: #1db954;
      padding: 4px;
    }
  }
  .table__container {
    padding: 10px;
    @media (max-width: 600px) {
      padding: 0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      @media (max-width: 600px) {
        th {
          font-size: 10px;
        }
        td {
          font-size: 14px;
        }
      }
      th,
      td {
        padding: 10px;
        text-align: left;
        @media (max-width: 600px) {
          padding: 5px 3px;
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
            color: gray;
          }
        }
      }
    }
  }
`;
