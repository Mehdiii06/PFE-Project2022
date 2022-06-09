import React, { useState, useEffect, Fragment } from "react";
import axios from "../../api/axios";
import Swal from "sweetalert2";
import "./Tasks.scss";

import { Form } from "react-bootstrap";

const EditTask = (props) => {
  const [id, setid] = useState(props.taskInfo._id);
  const [object, setObject] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("");
  const [assigned_to, setAssignedto] = useState([]);

  const token = localStorage.getItem("CC_Token");

  useEffect(() => {
    axios
      .get(`/api/tasks/${id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        setContent(res.data.content);
        setObject(res.data.object);
        setStatus(res.data.status);
        setAssignedto(res.data.assigned_to);
        setid(res.data._id);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.put(
      `/api/updatetask/${id}`,
      { object: object, content: content, status: status },
      {
        headers: { Authorization: `bearer ${token}` },
      }
    );
    setStatus(status);
    if (response) {



      props.setEditTask(false);

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

  return (
    <Fragment>
      <div className="headerTaskForms">
        <h2>.Edit Task</h2>
        <button className="add" onClick={() => props.setEditTask(false)}>
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
            onChange={(e) => {setObject(e.target.value)}}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Message*</Form.Label>
          <Form.Control
            type="text"
            as="textarea"
            style={{ maxHeight: "200px" }}
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Status</Form.Label>
          <select
            className="form-control"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option selected disabled>
              Select Status
            </option>
            <option value="UNASSIGNED">UNASSIGNED</option>
            <option value="WAITING">WAITING</option>
            <option value="INPROGRESS">INPROGRESS</option>
            <option value="INREVIEW">INREVIEW</option>
            <option value="DONE">DONE</option>
            <option value="ARCHIVED">ARCHIVED</option>
          </select>
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

export default EditTask;
