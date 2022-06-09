import React from "react";
import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import { MdAdd } from "react-icons/md";
import "./AddCard.scss";

const AddCard = () => {
  return (
    <>
      <Link to="/claims/addClaim">

      <Col lg={12} className="ADD">
       
          
            <MdAdd className="addicon" style={{ color: 'black'}}/>
          
       
      </Col>
      </Link>
    </>
  );
};

export default AddCard;
