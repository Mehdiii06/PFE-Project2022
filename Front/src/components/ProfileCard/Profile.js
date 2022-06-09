import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import "./Profile.scss";

import { Form, Button, InputGroup, FormControl } from "react-bootstrap";
import Toaster from "../Toaster/Toaster";
import axios from "../../api/axios";



import user from "../../assets/images/user.png";

const Profile = () => {
  const navigation = useNavigate();
  const [id, setId] = useState("");
  const [role, setRole] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("CC_Token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setusername(payload.username);
      setRole(payload.role);
      setemail(payload.email);
      setId(payload.id);
      setCompany(payload.company);
    } else {
      navigation("/");
      Toaster("error", "Unauthorized");
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.put(`/api/users/updatepassword/${id}`, {
      password: password,
    });
    if (response) {
      Toaster("success", "password changed ");
      setEdit(false);
    } else {
      Toaster("error", "something is wrong");
    }
  };


  return (
    <>
      <div className="contentProfile">
        <div className="div2">
          <div className="left">
            <div className="userTitle">
              <h2>{username}</h2>
              <div className="role">{role}</div>
            </div>
            <div className="imguser">
              <img src={user} alt="user" className="userImg" />
            </div>
          </div>
          <div className="right">
            <div className="user">
              <div className="headerProfile"></div>
              <ul>
                <li>
                  <h5>Email address</h5>
                  <div className="content">{email}</div>
                </li>
                <li>
                  <h5>Password</h5>
                  <div className="password">
                    {edit ? (
                      <Form className="passwordForm" onSubmit={handleSubmit} >
                        <Form.Group
                          className="editLabel"
                          controlId="formBasicPassword"
                        >
                          <Form.Control
                            type="password"
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                          Save
                        </Button>
                      </Form>
                    ) : (
                      <InputGroup className="passwordForm">
                        <div>
                        <FormControl
                          placeholder="*********"
                          className="editLabel"
                          disabled
                        />
                        </div>
                        <Button variant="outline-secondary" id="button-addon2" onClick={() => setEdit(true)}>
                          Edit
                        </Button>
                      </InputGroup>
                    )}
                  </div>
                </li>
                <li>
                  <h5>Company</h5>
                  <div className="content">
                    <div className="tt">{company}</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
