import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Users.scss";

import Developer from "./DevelopersTab";

import {
  FcFactory,
  FcConferenceCall,
  FcPortraitMode,
  FcNeutralDecision,
} from "react-icons/fc";

const Developers = () => {

  const [manager, setManager] = useState("");
  const [developer, setDeveloper] = useState("");
  const [client, setClient] = useState("");
  const [company, setCompany] = useState("");


  return (
    <div className="grid-container">
      <div className="nav">
        <Link to="/users/managers" style={{ textDecoration: 'none' }}>
            <div className="div">
                <FcPortraitMode className="icon" />
                <div>Project Managers</div>
            </div>
        </Link>
        
          <div className="user">
            <FcNeutralDecision className="icon" />
            <div>Developers</div>
          </div>
        <Link to="/users/clients" style={{ textDecoration: 'none' }}>
          <div className="div">
            <FcConferenceCall className="icon" />
            <div>Clients</div>
          </div>
        </Link>
        <Link to="/users/companies" style={{ textDecoration: 'none' }}>
          <div className="div">
            <FcFactory className="icon" />
            <div>Companies</div>
          </div>
        </Link>
      </div>
      <div className="container">
        <Developer />
      </div>
    </div>
  );
};

export default Developers;
