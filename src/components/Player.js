import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiFillPauseCircle,
  AiFillPlayCircle,
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

function Player({ token }) {
  const dispatch = useDispatch();
  const playing = useSelector(selectPlaying);
  const [track, setTrack] = useState({});
  const handlePlay = () => {
    if (playing) {
      s.pause();
      dispatch(setPlaying(false));
    } else {
      s.play();
      dispatch(setPlaying(true));
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
        setTrack(currentTrack);

        // if (this.state.playerState === null || this.state.playerState.track !== playerState.track || player) {}
      });

      // Ready
      player.addListener("ready", ({ device_id }) => {
        // console.log('Ready with Device ID', device_id);

        s.transferMyPlayback([device_id], {
          play: playing,
        })
          .then((res) => {
            console.log(res);
            this.setState({
              disabled: false,
            });
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
  console.log(playing);

  return (
    <div className="bg-spotify-black justify-between items-center flex h-32 text-white fixed left-0 right-0 bottom-0">
      <div className="flex space-x-2 items-center">
        <div>
          <img className="h-20" src={track?.album?.images[0]?.url} alt="" />
        </div>

        <div className="flex flex-col justify-center">
          <p className="mb-1">{track?.name}</p>
          <p className="text-gray-400 flex space-x-2">
            {track?.artists?.map((a) => (
              <p>{a.name}</p>
            ))}
          </p>
        </div>
        <AiFillHeart className="text-spotify-green text-2xl" />
      </div>

      <div className="flex space-x-5">
        <button onClick={() => s.skipToPrevious()}>
          <MdSkipPrevious className="text-4xl text-gray-400" />
        </button>
        <button onClick={handlePlay}>
          {playing ? (
            <AiFillPauseCircle className="text-5xl text-white" />
          ) : (
            <AiFillPlayCircle className="text-5xl text-white" />
          )}
        </button>
        <button onClick={() => s.skipToNext()}>
          <MdSkipNext className="text-4xl text-gray-400" />
        </button>
      </div>

      {/* right */}
      <div className="flex space-x-3">
        <MdQueueMusic className="text-3xl text-gray-400" />
        <MdDevices className="text-3xl text-gray-400" />
        <BsVolumeUpFill className="text-gray-400 text-3xl" />
      </div>
    </div>
  );
}

export default Player;
