import React, { useState } from "react";
import "./Claims.scss";

import ClaimCard from "./ClaimCard/ClaimCardAdmin";
import ArchivedClaim from './ClaimCard/ArchivedClaim'

import { Button, Form } from "react-bootstrap";
import { FiArchive } from "react-icons/fi";
import { BsSearch } from "react-icons/bs";
import { FaArchive } from "react-icons/fa";

const Claims = () => {
  const [query, setQuery] = useState("");
  const [archived, setArchived] = useState(false);

  const handlebutton = () => {
    setArchived(true);
  };

  const handleArchived = () => {
    setArchived(false);
  };

  return (
    <>
      <div className="all">
        {!archived ? (
          <>
            <div className="bar">
              <button className="filter" onClick={handlebutton}>
                <FiArchive className="iconFilter" />
                Archived
              </button>
              <Form className="input-group">
                <Button variant="primary" type="submit" disabled style={{ background:"#C7D435", borderColor:"#C7D435"}}>
                  <BsSearch />
                </Button>
                <input
                  type="text"
                  placeholder="Search..."
                  className="col-xs-4"
                  onChange={(e) => setQuery(e.target.value)}
                />
              </Form>
            </div>
            <div className="box">
              <ClaimCard query={query} />
            </div>
          </>
        ) : (
          <>
            <div className="bar">
              <button className="filterArchived" onClick={handleArchived}>
                <FaArchive className="iconFilter" />
                Archived
              </button>
              <Form className="input-group">
                <Button variant="primary" type="submit" disabled style={{ background:"#C7D435", borderColor:"#C7D435"}}>
                  <BsSearch />
                </Button>
                <input
                  type="text"
                  placeholder="Search..."
                  className="col-xs-4"
                  onChange={(e) => setQuery(e.target.value)}
                />
              </Form>
            </div>
            <div className="box">
              <ArchivedClaim query={query} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Claims;
