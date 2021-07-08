import React from "react";
import { login_url } from "../spotify";
import styled from "styled-components";

function Login() {
  return (
    <Container>
      <img src="https://cdn.worldvectorlogo.com/logos/spotify-1.svg" alt="" />
      <a href={login_url}>Login</a>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  height: 100vh;
  background-color: #191919;
  color: #fff;
  display: grid;
  place-items: center;
  img {
    height: 150px;
    @media (max-width: 600px) {
      height: 85px;
    }
  }
  a {
    background-color: #1db954;
    color: #fff;
    padding: 10px 20px;
    border-radius: 99px;
    font-weight: bold;
    text-decoration: none;
  }
`;
