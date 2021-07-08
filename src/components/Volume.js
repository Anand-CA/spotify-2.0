import React, { useEffect, useState } from "react";
import Slider from "@material-ui/core/Slider";
import { BsVolumeDownFill, BsVolumeUpFill } from "react-icons/bs";
import { s } from "../instance";
import styled from "styled-components";

export default function ContinuousSlider() {
  const [value, setValue] = useState(80);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    s.setVolume(value);
  }, [value]);
  return (
    <Container>
      <BsVolumeDownFill style={{ fontSize: "30px" }} />

      <Slider
        style={{ color: "#1DB954" }}
        value={value}
        onChange={handleChange}
        aria-labelledby="continuous-slider"
      />

      <BsVolumeUpFill style={{ fontSize: "30px" }} />
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 200px;
  @media (max-width: 600px) {
    display: none;
  }
  .icon {
    font-size: 50px;
  }
`;
