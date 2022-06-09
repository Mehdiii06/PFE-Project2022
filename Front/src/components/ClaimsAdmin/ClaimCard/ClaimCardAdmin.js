import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { statusClaim } from "./StatusColor";

import "./ClaimCardAdmin.scss";
import axios from "../../../api/axios";

import { Col } from "react-bootstrap";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineArticle } from "react-icons/md";
import { GoArchive } from "react-icons/go"

const ClamCardAdmin = ({ query }) => {
  const [claims, setclaims] = useState([]);

  const token = localStorage.getItem("CC_Token");

 

  useEffect(() => {
    axios
      .get("/api/claims", { headers: { Authorization: `bearer ${token}` } })
      .then((res) => {
        const list = res.data.data.claims;
        setclaims(list);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const archived = async (data) => {
    const id = data._id;
    const response = await axios.put(`/api/claim/archived/${id}`, { headers: { Authorization: `bearer ${token}` } })
    const claim = response.data
    console.log("resss",claim);
    if (response) {
      Swal.fire("Success Updated !");
    } else {
      Swal.fire({
        title: "warning",
        icon: "warning",
        showCancelButton: true,
      });
    }
  }

  return (
    <>
      {claims
        .filter((claim) => claim.status !== "ARCHIVED")
        .filter(
          (claim) =>
            claim.object.toLowerCase().includes(query) ||
            claim.status.toLowerCase().includes(query) ||
            claim.content.toLowerCase().includes(query) ||
            claim.author.toLowerCase().includes(query)
        )
        .map((claim) => (
          <div key={claim.id}>
            <Col lg={12} className="colll2">
              <div className="header">
                {statusClaim
                  .filter((s) => s.status === claim.status)
                  .map((s) => (
                    <div
                      className="status"
                      style={{ background: s.background }}
                    >
                      {claim.status}
                    </div>
                  ))}
                <div className="iconsss">
                  <div className="archived">
                    <GoArchive onClick={() => archived(claim)} />
                  </div>
                  <div className="edit">
                    <Link to={`/claimsAdmin/edit/${claim._id}`}>
                      <AiOutlineEdit style={{color:"black"}}/>
                    </Link>
                  </div>
                  <Link to={`/claimsAdmin/view/${claim._id}`}>
                    <MdOutlineArticle className="open" />
                  </Link>
                </div>
              </div>
              <div className="body">
                <h5>{claim.object}</h5>
                <p>{claim.content}</p>
              </div>
              <div className="footer">
                <div className="author">Author: {claim.author}</div>
                <div className="date">
                  {claim.createdAt.replace("T", " | ").slice(0, 18)}
                </div>
              </div>
            </Col>
          </div>
        ))}
    </>
  );
};

export default ClamCardAdmin;
