import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import "./ClaimEdit.scss";
import Swal from "sweetalert2";

import axios from "../../api/axios";

import { Form } from "react-bootstrap";

const ClaimEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [object, setObject] = useState();
  const [content, setContent] = useState();
  const [claim, setClaim] = useState("");

  const token = localStorage.getItem("CC_Token");

  useEffect(() => {
    axios
      .get(`/api/claims/${id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        setClaim(res.data);
        setContent(res.data.content);
        setObject(res.data.object);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.put(
      `/api/claim/${id}`,
      { content: content, object: object },
      {
        headers: { Authorization: `bearer ${token}` },
      }
    );
    if (response) {
      Swal.fire(
        "Success Updated !",
      );
      navigate("/claims");
    } else {
      Swal.fire({
        title: "warning",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#C7D435",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      })
    }
  };

  return (
    <>
      <div className="all2">
        <div className="headerr">
          <h1>.Edit Claim</h1>
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
        <Form className="formClaim" onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Subject*</Form.Label>
            <input
              type="text"
              value={object}
              onChange={(e) => setObject(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Message*</Form.Label>
            <textarea
              className="content"
              type="text"
              style={{ maxHeight: "200px" }}
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </Form.Group>
          <div className="buttons">
            <button variant="primary" type="submit" className="submit">
              SUBMIT
            </button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default ClaimEdit;
