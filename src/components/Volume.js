import React, { useEffect, useState } from "react";
import Slider from "@material-ui/core/Slider";
import { BsVolumeDownFill, BsVolumeUpFill } from "react-icons/bs";
import { s } from "../instance";

export default function ContinuousSlider() {
  const [value, setValue] = useState(80);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    s.setVolume(value);
  }, [value]);
  return (
    <div className="hidden w-48 space-x-2 items-center sm:flex justify-center">
      <BsVolumeDownFill className="text-5xl" />

      <Slider
        style={{ color: "#1DB954" }}
        value={value}
        onChange={handleChange}
        aria-labelledby="continuous-slider"
      />

      <BsVolumeUpFill className="text-5xl" />
    </div>
  );
}
