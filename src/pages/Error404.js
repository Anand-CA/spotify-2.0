import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 1 },
};

function Error404() {
  return (
    <Wrapper>
      <Container variants={container} initial="hidden" animate="show">
        <motion.img
          variants={item}
          src="/images/Spotify_Icon_RGB_Green.png"
          alt=""
        />
        <motion.h1 variants={item}>Page not found</motion.h1>
        <motion.p variants={item}>
          We can’t seem to find the page you are looking for.
        </motion.p>
        <Link to="/">
          <motion.button variants={item}>Home</motion.button>
        </Link>
      </Container>
    </Wrapper>
  );
}

export default Error404;
const Wrapper = styled.div`
  background-color: #121212;
  color: #fff;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  text-align: center;
  padding: 0 1rem;
  img {
    height: 4rem;
    object-fit: contain;
    margin-bottom: 1rem;
  }
  h1 {
    font-size: 2.6rem;
    @media (max-width: 600px) {
      font-size: 2rem;
    }
  }
  button {
    margin-top: 1rem;
    background-color: #fff;
    color: #000;
    padding: 12px 32px;
    border-radius: 48px;
    border: 1px solid #878787;
    font-weight: bold;
    cursor: pointer;
    &:active {
      transform: scale(0.9);
    }
  }
`;
