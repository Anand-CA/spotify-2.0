import React from "react";
import { usePlaybackState } from "react-spotify-web-playback-sdk";

function Toggle() {
  const playbackState = usePlaybackState();

  return (
    <div>
      <p>Current song: {playbackState.track_window.current_track.name}</p>
    </div>
  );
}

export default Toggle;
