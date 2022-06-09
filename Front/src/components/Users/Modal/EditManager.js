import React, { useState, useEffect, Fragment, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../../../api/axios";
import "./AddForm.scss";

import Toaster from "../../Toaster/Toaster";
import { Form } from "react-bootstrap";

const EditManager = (props) => {

  const [id, setid] = useState(props.managerInfo._id);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setrole] = useState("PROJECT_MANAGER");
  const [company, setCompany] = useState("iMaxeam");
  const token = localStorage.getItem("CC_Token");

  useEffect(() => {
    axios
      .get(`/api/users/${id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        setUsername(res.data.username);
        setEmail(res.data.email);
        setid(res.data._id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  useEffect(() => {
}, [username, role , email , company])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.put(
      `/api/updateuser/${id}`,
      {
        email: email,
        role: role,
        username: username,
        company: company,
      },
      {
        headers: { Authorization: `bearer ${token}` },
      }
    );
    if (response) {
      props.setEdit(false);
      Swal.fire("Success Updated !");
    } else {
      Swal.fire({
        title: "warning",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#C7D435",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
    }
  };

  console.log("setcompany : ", company);
  return (
    <Fragment className="AddForm">
      <div className="headerUserForm">
        <h2>.Edit Project Manager</h2>
        <button className="addForm" onClick={() => props.setEdit(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            color="#C7D435"
            fill="currentColor"
            className="bi bi-x-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
          </svg>
        </button>
      </div>
      <Form className="formClaim" onSubmit={handleSubmit}>
        <Form.Group className="mb-2" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Ussername"
            ref={usernameRef}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            ref={passwordRef}
            
            disabled
            required
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Role</Form.Label>
          <Form.Select
            value={role}
            onChange={(e) => setrole(e.target.value)}
            disabled
          >
            <option value={role}>Project Manager</option>
            <option disabled>Developer</option>
            <option disabled>Client</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Company</Form.Label>
          <Form.Select
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            disabled
          >
            <option value={company}>iMaxeam</option>
          </Form.Select>
        </Form.Group>

        <div className="buttonsForm">
          <button variant="primary" type="submit" className="submit">
            SUBMIT
          </button>
          <button variant="primary" type="reset" className="reset">
            RESET
          </button>
        </div>
      </Form>
    </Fragment>
  );
};

export default EditManager;
