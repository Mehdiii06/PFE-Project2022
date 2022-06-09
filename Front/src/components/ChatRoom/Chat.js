import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import './chat.scss'

import { InputGroup, FormControl, Button } from "react-bootstrap";

const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]); 

  return (
    <>
      <div className="chat-window">
        <div className="chat-header">
          <h4>Live Chat</h4>
        </div>
        <div className="chat-body">
          <ScrollToBottom className="message-container">
            {messageList.map((messageContent, index) => {
              return (
                <div
                  key={index}
                  className={username === messageContent.author ? "you" : "other"}
                >
                  <div>
                    <div className="message-content">
                      <p>{messageContent.message}</p>
                    </div>
                    <div className="message-meta">
                      <p className="authors">{messageContent.author}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollToBottom>
        </div>
        <div className="chat-footer">
          <InputGroup>
            <FormControl
              placeholder="write your message"
              type="text"
              value={currentMessage}
              onChange={(event) => {
                setCurrentMessage(event.target.value);
              }}
              onKeyPress={(event) => {
                event.key === "Enter" && sendMessage();
              }}
              style={{background:"#EFEFEF"}}
            />
            <Button variant="outline-secondary" onClick={sendMessage} style={{ background:"#C7D435", border:"0px", color:"black"}}>
              Send
            </Button>
          </InputGroup>
        </div>
      </div>
    </>
  );
};

export default Chat;
