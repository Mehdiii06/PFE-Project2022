import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import "./Tasks.scss";

import Toaster from '../Toaster/Toaster'

import { Form } from "react-bootstrap";

const AddTask = ({ setAddTask }) => {
  const navigate = useNavigate();
  const [id, setid] = useState("");
  const [object, setObject] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("UNASSIGNED");
  const [assigned_to, setAssignedto] = useState("");
  const [author, setAuthor] = useState("");

  const token = localStorage.getItem("CC_Token");

  useEffect(() => {
    const token = localStorage.getItem("CC_Token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setAuthor(payload.username);
    } else {
      navigate("/");
    }
  });

  useEffect(() => {}, [object, content, status, assigned_to]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/tasks",
        { object, content, status, assigned_to },
        {
          headers: { Authorization: `bearer ${token}` },
        }
      );
      if (response) {
        setAddTask(false);
        console.log(response)
        Toaster("success", "Task added ");
      }
    } catch (err) {
      console.log("error message :", err.response);

    }
  };

  return (
    <Fragment className="AddForm">
      <div className="headerTaskForm">
        <h2>.Add Task</h2>
        <button className="add" onClick={() => setAddTask(false)}>
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
        
        <Form.Group className="mb-3">
          <Form.Label>Subject*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your subject"
            value={object}
            onChange={(e) => setObject(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Message*</Form.Label>
          <Form.Control
            type="text"
            as="textarea"
            style={{ maxHeight: "200px" }}
            rows={4}
            placeholder="Enter your message"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </Form.Group>
        <div className="buttons">
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

export default AddTask;
