import React, { useEffect, useState } from "react";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import Spotify from "spotify-web-api-js";
import { Link } from "react-router-dom";
import { Header, Image, Label, Icon, Table } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import moment from "moment";
import SkeletonImage from "antd/lib/skeleton/Image";

var s = new Spotify();
function Main() {
  const { id } = useParams();
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [playlist, setPlaylist] = useState([]);
  console.log("id", id);
  useEffect(() => {
    console.log("hello");
    s.getPlaylist(id).then(
      function (data) {
        console.log("User playlistsss", data);
        setImage(data.images[0].url);
        setName(data.name);
        setPlaylist(data.tracks.items);
      },
      function (err) {
        console.error(err);
      }
    );
  }, [id]);

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }
  return (
    <div
      style={{ minHeight: "100vh" }}
      className="flex-1 h-full bg-spotify-black"
    >
      {/* banner */}
      <div className="h-80 w-full bg-gradient-to-r relative from-red-500">
        <div className="flex absolute bottom-4 left-4">
          <img className="h-32 w-32 mr-5 items-end" src={image} alt="" />
          <h1 className="text-5xl font-bold ">{name}</h1>
        </div>
      </div>

      <Table basic="very" className="p-5" inverted>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>#</Table.HeaderCell>
            <Table.HeaderCell>TITLE</Table.HeaderCell>
            <Table.HeaderCell>ALBUM</Table.HeaderCell>
            <Table.HeaderCell>DATE ADDED</Table.HeaderCell>
            <Table.HeaderCell>DURATION</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {playlist.map((p, index) => (
            <Table.Row>
              <Table.Cell>
                <p>{index}</p>
              </Table.Cell>
              <Table.Cell>
                <div className="flex">
                  <img
                    className="h-14 mr-4"
                    src={p.track.album.images[0].url}
                    alt=""
                  />
                  <div className="flex justify-center flex-col">
                    <p className="mb-1">{p.track.name}</p>
                    <p className="text-gray-400">{p.track.artists[0].name}</p>
                  </div>
                </div>
              </Table.Cell>
              <Table.Cell>
                <p>{p.track.album.name}</p>
              </Table.Cell>
              <Table.Cell>
                <p>{moment().startOf(p.added_at).fromNow()}</p>
              </Table.Cell>
              <Table.Cell>
                <p>{millisToMinutesAndSeconds(p.track.duration_ms)}</p>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default Main;
