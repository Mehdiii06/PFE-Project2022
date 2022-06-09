import React from "react";
import "./bFame.scss";

import ChatRoom from '../ChatRoom/ChatRoom'

const bFrame = (props) => {
  return (
    <>
      <div className="row w-100">
        <div className="div1">{props.contain}</div>
      </div>
    </>
  );
};

export default bFrame;
