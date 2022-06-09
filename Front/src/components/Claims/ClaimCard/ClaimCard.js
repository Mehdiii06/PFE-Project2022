import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Toaster from "../../Toaster/Toaster";
import Swal from "sweetalert2";
import { statusClaim } from "./StatusColor";

import "./ClaimCard.scss";

import AddCard from "../AddCard/AddCard";
import axios from "../../../api/axios";

import { Col } from "react-bootstrap";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineArticle, MdDelete } from "react-icons/md";

const ClamCard = ({ query }) => {
  const [claims, setclaims] = useState([]);
  const [username, setusername] = useState("");
  const [delet, setdelet] = useState("");

  const token = localStorage.getItem("CC_Token");

  useEffect(() => {
    axios
      .get("/api/claims", { headers: { Authorization: `bearer ${token}` } })
      .then((res) => {
        const list =
          res?.data?.data?.claims?.filter(
            (claim) => claim.author === username
          ) ?? [];
        setclaims(list);
        console.log(list);
        setdelet(false);
        console.log(list);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [username, delet]);

  useEffect(() => {
    const token = localStorage.getItem("CC_Token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setusername(payload.username.toUpperCase());
    } else {
      console.log("error");
    }
  }, []);

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
          "Your Claim has been deleted.",
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
        .filter(
          (claim) =>
            (claim.object.toLowerCase().includes(query) ||
            claim.content.toLowerCase().includes(query) ||
            claim.status.toLowerCase().includes(query)) &&
            claim.status !== "ARCHIVED"
        )
        .map((claim) => (
          <div key={claim.id}>
            <Col lg={12} className="colll">
              <div className="h">
                {statusClaim
                  .filter((s) => s.status === claim.status)
                  .map((s) => (
                    <div
                      className="statuss"
                      style={{ background: s.background }}
                    >
                      {claim.status}
                    </div>
                  ))}
                  <div className="icons">
                  <div className="delete">
                  <MdDelete  onClick={() => del(claim)} />
                  </div>
                  <div className="editt">
                  <Link to={`/claims/edit/${claim._id}`} >
                    <AiOutlineEdit style={{ color: "black"}}/>
                  </Link>
                  </div>
                  <Link to={`/claims/view/${claim._id}`}>
                    <MdOutlineArticle className="openn" />
                  </Link>
                </div>
              </div>
              <div className="body">
                <h5>{claim.object}</h5>
                <p>{claim.content}</p>
              </div>
              <div className="footer">
                {claim.createdAt.replace("T", " | ").slice(0, 18)}
              </div>
            </Col>
          </div>
        ))}
      <AddCard />
    </>
  );
};

export default ClamCard;
