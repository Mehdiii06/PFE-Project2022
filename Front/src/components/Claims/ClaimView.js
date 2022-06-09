import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import "./ClaimView.scss";

import axios from "../../api/axios";

const Claims = () => {
  const { id } = useParams();
  const [claim, setclaim] = useState("");
  const token = localStorage.getItem("CC_Token");

  useEffect(() => {
    axios
      .get(`/api/claims/${id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        setclaim(res.data);
      });
  }, [id]);

  return (
    <>
      <div className="all2">
        <div className="header">
          <h2>{claim.object}</h2>
          <button className="closeBtn">
            <Link to="/claims">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="45"
                height="45"
                color="#C7D435"
                fill="currentColor"
                className="bi bi-x-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
              </svg>
            </Link>
          </button>
        </div>

        <div className="claim">
          <div className="status">{claim.status}</div>
          <p className="pc">{claim.content}</p>
        </div>
      </div>
    </>
  );
};

export default Claims;
