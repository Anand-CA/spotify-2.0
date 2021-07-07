import { motion } from "framer-motion";
import React, { useCallback, useEffect, useState } from "react";
import {
  AiFillHeart,
  AiFillPauseCircle,
  AiFillPlayCircle,
  AiOutlineFullscreen,
  AiOutlineFullscreenExit,
  AiOutlineHeart,
} from "react-icons/ai";
import { BsVolumeUpFill } from "react-icons/bs";
import {
  MdDevices,
  MdQueueMusic,
  MdSkipNext,
  MdSkipPrevious,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentPlayTrack,
  selectPlaying,
  setCurrentTrack,
  setPlaying,
} from "../features/songSlice";
import { s } from "../instance";
import Slider from "./Slider";
import Volume from "./Volume";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Details from "./Details";

const variants = {
  begin: { scale: 3 },
  end: { scale: 1 },
};
function Player({ token }) {
  const handle = useFullScreenHandle();
  const [artistImg, setArtistImg] = useState("");
  const [fullscreen, setFullscreen] = useState(false);
  const dispatch = useDispatch();
  const [artistId, setArtistId] = useState("");
  const currentPlayTrack = useSelector(selectCurrentPlayTrack);
  const [track, setTrack] = useState({});
  const handlePlay = () => {
    if (currentPlayTrack.paused) {
      s.play();
    } else {
      s.pause();
    }
  };

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
  }, []);
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
    <div className="bg-spotify-black items-center flex p-5 text-white fixed left-0 right-0 bottom-0">
      <div className="flex flex-1 space-x-2 items-center">
        <div>
          <img
            className="h-14 sm:h-20 object-contain "
            src={track?.album?.images[0]?.url}
            alt=""
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="mb-1 sm:text-base text-sm">{track?.name}</p>
          <p className="text-xs sm:text-base text-gray-400 flex space-x-2">
            {track?.artists
              ?.map((a) => {
                return a.name;
              })
              .join(",")}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center space-y-1">
        <div className="item-center flex space-x-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => s.skipToPrevious()}
          >
            <MdSkipPrevious className="text-4xl text-gray-400" />
          </motion.button>
          <motion.button whileTap={{ scale: 0.9 }} onClick={handlePlay}>
            {!currentPlayTrack.paused ? (
              <AiFillPauseCircle className="text-5xl  text-white" />
            ) : (
              <AiFillPlayCircle className="text-5xl text-white" />
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

      {/* right */}
      <div className="flex items-center justify-end flex-1 space-x-3">
        <MdQueueMusic className="text-3xl text-gray-400" />
        <MdDevices className="text-3xl text-gray-400" />
        <Volume className="" />
        <button onClick={screen1.enter}>
          <AiOutlineFullscreen className="text-3xl text-gray-400" />
        </button>
      </div>

      <FullScreen
        className={`${fullscreen ? "block" : "hidden"}`}
        handle={screen1}
        onChange={reportChange}
      >
        <Details
          artistImg={artistImg}
          img={track?.album?.images[0]?.url}
          title={track?.name}
        />
      </FullScreen>
    </div>
  );
}

export default Player;
