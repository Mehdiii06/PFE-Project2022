import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Users.scss";

import Manager from "./ManagerTab";
import Clients from "./ClientsTab";
import Company from "./CompaniesTab";

import {
  FcFactory,
  FcConferenceCall,
  FcPortraitMode,
  FcNeutralDecision,
} from "react-icons/fc";

const Managers = () => {

  const [manager, setManager] = useState("");
  const [developer, setDeveloper] = useState("");
  const [client, setClient] = useState("");
  const [company, setCompany] = useState("");


  return (
    <div className="grid-container">
      <div className="nav">
        <div className="user">
          <FcPortraitMode className="icon" />
          <div>Project Managers</div>
        </div>
        <Link to="/users/developers" style={{ textDecoration: 'none' }}>
          <div className="div" >
            <FcNeutralDecision className="icon" />
            <div>Developers</div>
          </div>
        </Link>
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
        <Manager />
      </div>
    </div>
  );
};

export default Managers;
