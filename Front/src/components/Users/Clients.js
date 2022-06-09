import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Users.scss";

import Client from "./ClientsTab";

import {
  FcFactory,
  FcConferenceCall,
  FcPortraitMode,
  FcNeutralDecision,
} from "react-icons/fc";

const Clients = () => {
  const [manager, setManager] = useState("");
  const [developer, setDeveloper] = useState("");
  const [client, setClient] = useState("");
  const [company, setCompany] = useState("");

  return (
    <div className="grid-container">
      <div className="nav">
        <Link to="/users/managers" style={{ textDecoration: "none" }}>
          <div className="div">
            <FcPortraitMode className="icon" />
            <div>Project Managers</div>
          </div>
        </Link>
        <Link to="/users/developers" style={{ textDecoration: "none" }}>
          <div className="div">
            <FcNeutralDecision className="icon" />
            <div>Developers</div>
          </div>
        </Link>

        <div className="user">
          <FcConferenceCall className="icon" />
          <div>Clients</div>
        </div>
        <Link to="/users/companies" style={{ textDecoration: "none" }}>
          <div className="div">
            <FcFactory className="icon" />
            <div>Companies</div>
          </div>
        </Link>
      </div>
      <div className="container">
        <Client />
      </div>
    </div>
  );
};

export default Clients;
