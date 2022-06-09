import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Toaster from "../../Toaster/Toaster";
import Swal from "sweetalert2";
import { statusClaim } from "./StatusColor";

import "./ClaimCardAdmin.scss";
import axios from "../../../api/axios";

import { Col } from "react-bootstrap";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineArticle, MdDelete } from "react-icons/md";

const ArchivedClaim = ({ query }) => {
  const [claims, setclaims] = useState([]);
  const [delet, setdelet] = useState("");

  const token = localStorage.getItem("CC_Token");

  useEffect(() => {
    axios
      .get("/api/claims", { headers: { Authorization: `bearer ${token}` } })
      .then((res) => {
        const list = res.data.data.claims;
        setclaims(list);
        setdelet(false);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [delet]);

  function del(data) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#34b233",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Deleted!",
          "Your file has been deleted.",
          "success",
          del2(data)
        );
      }
    });
  }
  function del2(data) {
    const id = data._id;
    axios
      .delete(`/api/claims/${id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        setdelet(true);
      })
      .catch((err) => {
        Toaster("error", "something went wrong");
      });
  }

  return (
    <>
      {claims
        .filter((claim) => claim.status === "ARCHIVED")
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
                  <div className="delete">
                    <MdDelete onClick={() => del(claim)} />
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

export default ArchivedClaim;
