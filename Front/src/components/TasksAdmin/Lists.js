import React, { useState, useEffect, Fragment } from "react";
import "./Tasks.scss";
import axios from "../../api/axios";
import { statusColor } from "./types";
import Swal from "sweetalert2";
import Toaster from "../Toaster/Toaster";
import Modal from "react-modal";

import AddTask from "./AddTask";
import EditTaskModal from "./EditTask";
import AssignedTo from "./AssignedTo";

import { MdAdd } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineAssignmentInd } from "react-icons/md";

const Lists = () => {
  const [delet, setdelet] = useState("");
  const [addTask, setAddTask] = useState(false);
  const [EditTask, setEditTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskInfo, setTaskInfo] = useState({});
  const [assign, setAssign] = useState(false);

  const token = localStorage.getItem("CC_Token");

  const AddtaskIcon = (statusColor) => {
    if (statusColor.status === "UNASSIGNED") {
      return (
        <button className="addTaskk" onClick={() => setAddTask(true)}>
          <MdAdd className="addicon" />
        </button>
      );
    } else {
      return <></>;
    }
  };

  const EditTaskBtn = (t) => {
    setEditTask(true);
    setTaskInfo(t);
  };

  const AssignTaskBtn = (t) => {
    setAssign(true);
    setTaskInfo(t);
  };

  useEffect(() => {
    axios
      .get("/api/tasks", { headers: { Authorization: `bearer ${token}` } })
      .then((res) => {
        const list = res.data.data.tasks;
        setTasks(list);
        console.log("list: ", list);
      })
      .catch((err) => {
        console.log(err);
      });
  },[delet]);

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
        Swal.fire("Deleted!", "Task has been deleted.", "success", del2(data));
      }
    });
  }
  function del2(data) {
    const id = data._id;
    axios
      .delete(`/api/tasks/${id}`, {
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
    <div className="tasksss">
      {statusColor.map((s) => (
        <div
          key={s.status}
          className="taskList"
          style={{ borderImage: s.borderImage }}
        >
          <div className="headerTask">
            <div className="barTitle">
              <h6 style={{ color: s.color }}>{s.status}</h6>
            </div>
            <Fragment>
              {AddtaskIcon(s)}
              <Modal
                isOpen={addTask}
                onRequestClose={() => setAddTask(false)}
                shouldCloseOnOverlayClick={true}
                style={{
                  overlay: {
                    position: "fixed",
                    backgroundColor: "grey",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  content: {
                    position: "relative",
                    background: "#fff",
                    borderRadius: "10px",
                    outline: "none",
                    padding: "40px",
                    width: "40rem",
                  },
                }}
              >
                <AddTask setAddTask={setAddTask} />
              </Modal>
            </Fragment>
          </div>
          <div className="cards">
            {tasks
              .filter((t) => t.status === s.status)
              .map((t, index) => {
                return (
                  <div key={index} className="card">
                    <div className="titelTask">
                      <div className="objectTask">{t.object}</div>
                      <div className="taskActions">
                        <Fragment>
                          <button
                            className="assignedtoBtn"
                            onClick={() => AssignTaskBtn(t)}
                          >
                            <MdOutlineAssignmentInd />
                          </button>
                          <Modal
                            isOpen={assign}
                            onRequestClose={() => setAssign(false)}
                            shouldCloseOnOverlayClick={true}
                            style={{
                              overlay: {
                                position: "fixed",
                                backgroundColor: "grey",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              },
                              content: {
                                position: "relative",
                                background: "#fff",
                                borderRadius: "10px",
                                outline: "none",
                                padding: "40px",
                                width: "40rem",
                              },
                            }}
                          >
                            <AssignedTo
                              setAssign={setAssign}
                              taskInfo={taskInfo}
                            />
                          </Modal>
                        </Fragment>
                        <Fragment key={t._id}>
                          <button
                            className="editBtn"
                            onClick={() => EditTaskBtn(t)}
                          >
                            <FiEdit3
                              style={{ width: "14px", height: "14px" }}
                            />
                          </button>
                          <Modal
                            isOpen={EditTask}
                            onRequestClose={() => setEditTask(false)}
                            shouldCloseOnOverlayClick={true}
                            style={{
                              overlay: {
                                position: "fixed",
                                backgroundColor: "grey",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              },
                              content: {
                                position: "relative",
                                background: "#fff",
                                borderRadius: "10px",
                                outline: "none",
                                padding: "40px",
                                width: "40rem",
                              },
                            }}
                          >
                            <EditTaskModal
                              taskInfo={taskInfo}
                              setEditTask={setEditTask}
                            />
                          </Modal>
                        </Fragment>
                      </div>
                    </div>
                    <p className="bodytask">{t.content}</p>
                    <div className="footerTask">
                      <div className="btnn">
                        <button
                          style={{
                            color: "red",
                            background: "none",
                            border: "0px",
                            height: "12px",
                            padding: "0px",
                          }}
                          onClick={() => del(t)}
                        >
                          Delete
                        </button>
                      </div>
                      <div className="datetask">
                        {t.createdAt.replace("T", " | ").slice(0, 18)}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Lists;
