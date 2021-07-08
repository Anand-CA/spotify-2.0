import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { s } from "../instance";
import styled from "styled-components";

function Home() {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  useEffect(() => {
    s.getUserPlaylists()
      .then((data) => {
        console.log("user playlist ????", data);
        setPlaylists(data.items);
      })
      .catch((err) => {
        console.log("errr", err);
      });
    s.getMyTopArtists((err, data) => {
      console.log("top artist", data);
    });
  }, []);
  console.log(playlists);
  const handleScroll = () => {
    if (ref.current.scrollTop > 240) {
      setShow(true);
    } else {
      setShow(false);
    }
  };
  return (
    <Container ref={ref} onScroll={handleScroll}>
      <Header show={show} />
      <h1 className="home__heading">My playlists</h1>

      {/*  */}
      <div className="home__grid ">
        {playlists?.map((p, index) => (
          <Link key={index} to={`/playlist/${p.id}`}>
            <div className="wrap">
              <img src={p?.images[0]?.url} alt="" />
              <p>{p.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}

export default Home;

const Container = styled.div`
  overflow-y: scroll;
  height: 100vh;
  flex: 1;
  color: #fff;
  background-color: #191919;
  padding-bottom: 100px;
  &::-webkit-scrollbar {
    display: none;
  }
  .home__heading {
    padding: 60px 10px 0 10px;
  }
  .home__grid {
    display: grid;
    grid-gap: 5px;
    grid-template-columns: repeat(4, minmax(0, 1fr));

    @media (max-width: 1024px) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    @media (max-width: 600px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    a {
      text-decoration: none;
    }
    .wrap {
      padding: 18px;
      &:hover {
        background-color: rgba(0, 0, 0, 0.8);
      }
      img {
        width: 100%;
        object-fit: contain;
      }
      p {
        color: #fff;
        font-weight: 600;
      }
      span {
        font-size: 14px;
        color: gray;
      }
    }
  }
`;
