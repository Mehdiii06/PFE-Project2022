import React, { useState, useEffect } from "react";
import "./ChatRoom.scss";
import io from "socket.io-client";
import Chat from "./Chat";

import { InputGroup, FormControl, Button } from "react-bootstrap";

const socket = io.connect("http://localhost:5000");

const ChatRoom = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("CC_Token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUsername(payload.username);
    } else {
    }
  });

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <>
      <div className="chat-main">
        {!showChat ? (
          <div className="joinChatContainer">
            <h4 className="chatheader">
              <div>Chatroom</div>
            </h4>
            <div className="joinchatbody">
              <InputGroup>
                <FormControl 
                  type="text"
                  placeholder="Room ID..."
                  onChange={(event) => {
                    setRoom(event.target.value);
                  }}
                />
                <button
                  onClick={joinRoom}
                  className="join-btn"
                >
                  Join
                </button>
              </InputGroup>
            </div>
          </div>
        ) : (
          <Chat socket={socket} username={username} room={room} />
        )}
      </div>
    </>
  );
};

export default ChatRoom;
