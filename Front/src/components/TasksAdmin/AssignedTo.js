import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import Toaster from '../Toaster/Toaster'
import "./Tasks.scss";

import { IoMdAdd } from "react-icons/io";

const AssignedTo = ({ taskInfo, setAssign }) => {
  const [assignedto, setAssignedto] = useState(taskInfo.assigned_to);
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("CC_Token");

  useEffect(() => {
    axios
      .get("/api/users", {
        headers: { Authorization: `bearer ${token}` },
      })
      .then((res) => {
        const Users =
          res?.data?.data?.users?.filter(
            (u) => u.role === "PROJECT_MANAGER" || u.role === "DEVELOPER"
          ) ?? [];
        setUsers(Users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleAssigned = async (val) => {
    try {
      const response = await axios.put(
        `/api/tasks/assigned/${taskInfo._id}`,
        { val: val },
        {
          headers: { Authorization: `bearer ${token}` },
        }
      );
      console.log(response.data);
      if (response) {
        Toaster("success", `Success assigned to ${val}!`);
      }
    } catch (err) {
      console.log("error message :", err.response);
    }
  };

  const handleUnassigned = async (val) => {
    try {
      const response = await axios.put(
        `/api/tasks/unassigned/${taskInfo._id}`,
        { val: val },
        {
          headers: { Authorization: `bearer ${token}` },
        }
      );
      console.log(response.data);
      if (response) {
        Toaster("success", `Success unassigned to ${val}!`);
      }
    } catch (err) {
      console.log("error message :", err.response);
    }
  };

  return (
    <Fragment>
      <div className="headerTaskForms">
        <h2>.Assign/Unassign</h2>
        <button className="add" onClick={() => setAssign(false)}>
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
      <div className="assignedTo">
        <h4>Assigned to :</h4>
        <div className="assignedToList">
          {assignedto
            .filter((a) => a.length !== 0)
            .map((a, index) => (
              <div key={index} className="assTo">
                <button
                  className="cancelBtn"
                  onClick={() => handleUnassigned(a)}
                >
                  X
                </button>{" "}
                <div className="ass-user">{a}</div>
                
              </div>
            ))}
        </div>
      </div>
      <div className="unassignedTo">
        <h4>Unassigned Developers :</h4>
        <div className="unassignedToList">
          {users
            .map((u) => u.username)
            .filter((u) => !taskInfo.assigned_to.includes(u))
            .map((u, index) => (
              <div key={index} className="unassTo">
                <button className="addBtn" onClick={() => handleAssigned(u)}>
                  <IoMdAdd className="adddd" />
                </button>
                <div className="unass-user">{u}</div>
              </div>
            ))}
        </div>
      </div>
    </Fragment>
  );
};

export default AssignedTo;
