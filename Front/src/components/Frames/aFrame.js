import React from "react";
import "./aFrame.scss";

import ChatRoom from '../ChatRoom/ChatRoom'

const aFrame = (props) => {
  return (
    <>
      <div className="roww">
        <div className="divv">{props.contain}</div>
        <div className="divv2">{props.chat}</div>
      </div>
    </>
  );
};

export default aFrame;
