import React, { useState } from "react";
import "./Claims.scss";

import ClaimCard from "./ClaimCard/ClaimCard";

import { Button, Form } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { FiArchive } from "react-icons/fi";

const Claims = () => {

  const [query, setQuery] = useState('')
  
 
  return (
    <>
      <div className="all">
        <div className="bar">
          {/* <button className="filter" onClick={() => handlebutton()}>
            <FiArchive className="iconFilter" />
            Archived
          </button> */}
          <Form className="input-group" >
            <Button variant="primary" type="submit" disabled style={{ background:"#C7D435", borderColor:"#C7D435"}}>
              <BsSearch />
            </Button>
            <input type="text" placeholder="Search..." className="col-xs-4" onChange={(e) => setQuery(e.target.value)}/>
          </Form>
        </div>
        <div className="box">
          <ClaimCard query={query}/>
        </div>
      </div>
    </>
  );
};

export default Claims;
