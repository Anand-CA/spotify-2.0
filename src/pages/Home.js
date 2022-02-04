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
      <h1>My playlists</h1>
      <div className="grid">
        {playlists?.map((p, index) => (
          <Link key={index} to={`/playlist/${p.id}`}>
            <div className="wrap">
              <img src={p?.images[0]?.url} alt="" />
              <h4>{p.name}</h4>
              <p
                dangerouslySetInnerHTML={{
                  __html: p.description,
                }}
              ></p>{" "}
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}

export default Home;

const Container = styled.div`
  color: #fff;
  background-color: #191919;
  padding-bottom: 100px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }

  h1 {
    padding: 2rem 1.5rem 0.5rem 1.5rem;
  }

  .grid {
    padding: 1rem 1.5rem;
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(6, minmax(0, 1fr));

    @media (max-width: 1488px) {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
    @media (max-width: 1190px) {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
    @media (max-width: 1024px) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    @media (max-width: 600px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    a {
      text-decoration: none;
      color: inherit;
    }
    .wrap {
      padding: 18px;
      border-radius: 5px;
      background-color: rgba(1, 1, 1, 0.2);
      height: 100%;

      &:hover {
        background-color: rgba(42, 42, 42, 1);
      }
      img {
        border-radius: 3px;
        object-fit: cover;
        margin-bottom: 0.6rem;
        max-width: 100%;
      }
      h4 {
        color: #fff;
        margin-bottom: 0.4rem;
      }
      p {
        opacity: 0.6;
        font-size: 0.8rem;
      }
      span {
        font-size: 14px;
        color: gray;
      }
    }
  }
`;
