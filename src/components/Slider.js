import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import { s } from "../instance";
import { selectCurrentPlayTrack } from "../features/songSlice";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  root: {
    width: 325,
  },
});

const Seeker = () => {
  const classes = useStyles();
  const currentPlayTrack = useSelector(selectCurrentPlayTrack);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (currentPlayTrack) {
      setValue((currentPlayTrack.position / currentPlayTrack.duration) * 100);
      if (!currentPlayTrack.paused) {
        const interval = setInterval(() => {
          setValue((value) => {
            const newPosition = (value / 100) * currentPlayTrack.duration;
            return ((newPosition + 1000) / currentPlayTrack.duration) * 100;
          });
        }, 1000);
        return () => clearInterval(interval);
      }
    }
  }, [currentPlayTrack]);

  const handleChange = (event, newValue) => {
    s.seek(Math.floor((newValue / 100) * currentPlayTrack.duration));
  };

  return (
    <div className={classes.root}>
      <Slider
        style={{ color: "#1DB954" }}
        value={value}
        onChangeCommitted={handleChange}
        aria-labelledby="continuous-slider"
      />
    </div>
  );
};

export default Seeker;
