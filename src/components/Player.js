import { motion } from "framer-motion";
import React, { useCallback, useEffect, useState } from "react";
import {
  AiFillPauseCircle,
  AiFillPlayCircle,
  AiOutlineFullscreen,
} from "react-icons/ai";
import {
  MdDevices,
  MdQueueMusic,
  MdSkipNext,
  MdSkipPrevious,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentPlayTrack, setCurrentTrack } from "../features/songSlice";
import { s } from "../instance";
import Slider from "./Slider";
import Volume from "./Volume";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Details from "./Details";
import styled from "styled-components";

function Player({ token }) {
  const [artistImg, setArtistImg] = useState("");
  const [fullscreen, setFullscreen] = useState(false);
  const dispatch = useDispatch();
  const [artistId, setArtistId] = useState("");
  const currentPlayTrack = useSelector(selectCurrentPlayTrack);
  const [track, setTrack] = useState({});
  const [disabled, setDisabled] = useState(true);
  const handlePlay = () => {
    if (currentPlayTrack.paused) {
      s.play();
    } else {
      s.pause();
    }
  };
  console.log(fullscreen);
  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const _token = token;
      const player = new window.Spotify.Player({
        name: "Another Spotify Clone",
        getOAuthToken: (cb) => {
          cb(_token);
        },
      });

      // Error handling
      player.addListener("initialization_error", ({ message }) => {
        console.error(message);
      });
      player.addListener("authentication_error", ({ message }) => {
        console.error(message);
      });
      player.addListener("account_error", ({ message }) => {
        console.error(message);
      });
      player.addListener("playback_error", ({ message }) => {
        console.error(message);
      });

      // Playback status updates
      player.addListener("player_state_changed", (state) => {
        // console.log(state);
        const currentTrack = state.track_window.current_track;
        console.log("current 999", currentTrack);
        setArtistId(currentTrack.artists[0].uri.slice(15));
        console.log("state 999", state);
        dispatch(
          setCurrentTrack({
            duration: state.duration,
            position: state.position,
            paused: state.paused,
          })
        );
        setTrack(currentTrack);

        // if (this.state.playerState === null || this.state.playerState.track !== playerState.track || player) {}
      });

      // Ready
      player.addListener("ready", ({ device_id }) => {
        // console.log('Ready with Device ID', device_id);

        s.transferMyPlayback([device_id], {
          play: false,
        })
          .then((res) => {
            console.log(res);
            setDisabled(false);
          })
          .catch((err) => {
            console.log(err);
          });
      });

      // Not Ready
      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      // Connect to the player!
      player.connect();
    };
  }, [dispatch, token]);
  console.log("artist id >>>", artistId);
  console.log("image >>>>>>>>", artistImg);
  const screen1 = useFullScreenHandle();

  useEffect(() => {
    s.getArtist(artistId, (err, data) => {
      console.log("artist image >>>", data);
      setArtistImg(data?.images[0]?.url);
    });
  }, [artistId]);

  const reportChange = useCallback(
    (state, handle) => {
      if (handle === screen1) {
        console.log("Screen 1 went to", state, handle);
        setFullscreen(state);
      }
    },
    [screen1]
  );
  return (
    <>
      {/* left */}
      {disabled ? (
        <div className="note">
          <h2>Buy premium for player controls</h2>
          <p>More features availble on desktop version...</p>
        </div>
      ) : (
        <Container style={{ width: "100%" }}>
          <div className="left">
            <img
              className="h-14 sm:h-20 object-contain "
              src={track?.album?.images[0]?.url}
              alt=""
            />

            <div className="flex flex-col justify-center">
              <p className="mb-1 sm:text-base text-sm">{track?.name}</p>
              <span className="text-xs sm:text-base text-gray-400 flex space-x-2">
                {track?.artists
                  ?.map((a) => {
                    return a.name;
                  })
                  .join(",")}
              </span>
            </div>
          </div>

          {/* middle */}
          <div className="middle">
            <div className="middle__top item-center flex space-x-4">
              <motion.div
                whileTap={{ scale: 0.9 }}
                onClick={() => s.skipToPrevious()}
              >
                <MdSkipPrevious className="icon text-4xl text-gray-400" />
              </motion.div>
              <motion.div whileTap={{ scale: 0.9 }} onClick={handlePlay}>
                {!currentPlayTrack.paused ? (
                  <AiFillPauseCircle style={{ fontSize: "50px" }} />
                ) : (
                  <AiFillPlayCircle style={{ fontSize: "50px" }} />
                )}
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.9 }}
                onClick={() => s.skipToNext()}
              >
                <MdSkipNext className="icon text-4xl text-gray-400" />
              </motion.div>
            </div>

            <Slider />
          </div>

          {/* right */}
          <div className="right">
            <MdQueueMusic className="icon " />
            <MdDevices className="icon " />
            <Volume />
            <div onClick={screen1.enter}>
              <AiOutlineFullscreen className="icon" />
            </div>
          </div>
        </Container>
      )}

      <FullScreen handle={screen1} onChange={reportChange}>
        <Details
          visible={fullscreen}
          artistImg={artistImg}
          img={track?.album?.images[0]?.url}
          title={track?.name}
        />
      </FullScreen>
    </>
  );
}

export default Player;

const Container = styled.div`
  background-color: #191414;
  position: fixed;
  bottom: 0;
  padding: 10px;
  display: flex;
  right: 0;
  color: #fff;
  left: 0;
  .note {
    h2 {
      font-size: 14px;
    }
    p {
      font-size: 14px;
    }
  }
  align-items: center;
  .left {
    flex: 1;
    display: flex;
    align-items: center;
    img {
      height: 70px;
      object-fit: contain;
      margin-right: 10px;
      @media (max-width: 600px) {
        height: 50px;
      }
    }
    p {
      font-weight: 800;
      @media (max-width: 600px) {
        font-size: 12px;
      }
    }
    span {
      color: grey;
      font-size: 14px;
      @media (max-width: 600px) {
        font-size: 12px;
      }
    }
  }
  .middle {
    flex: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
    .middle__top {
      display: flex;
      align-items: center;
      .icon {
        font-size: 30px;
        margin: 0 5px;
        @media (max-width: 600px) {
          font-size: 20px;
        }
      }
    }
  }
  .right {
    flex: 1;
    display: flex;
    align-items: center;
    .icon {
      margin: 5px;
      font-size: 24px;
      color: grey;
    }
    justify-content: flex-end;
  }
`;
