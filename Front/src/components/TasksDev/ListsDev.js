import React, { useState, useEffect, Fragment } from "react";
import "./TasksDev.scss";
import axios from "../../api/axios";
import { statusColor } from "./types";
import ModalEdit from "./ModalEdit";
import Swal from "sweetalert2";
import Toaster from "../Toaster/Toaster";
import Modal from "react-modal";

import EditTask from "./EditTask";

import { FiEdit3 } from "react-icons/fi";

const Lists = () => {
  const [delet, setdelet] = useState("");
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskInfo, setTaskInfo] = useState({});
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("CC_Token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUsername(payload.username);
      console.log("user : ", username);
    }
  });

  const handleButton = (t) => {
    setOpen(true);
    setTaskInfo(t);
  };

  

  const token = localStorage.getItem("CC_Token");

  useEffect(() => {
    axios
      .get("/api/tasks", { headers: { Authorization: `bearer ${token}` } })
      .then((res) => {
        const list = res.data.data.tasks;
        setTasks(list);
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

  const [show, setShow] = useState(false);

  const onOpen = () => setShow(true);

  const onClose = () => setShow(false);

  return (
    <div className="taskss">
      {statusColor
        .filter((s) => s.status !== "UNASSIGNED")
        .map((s) => (
          <div
            key={s.status}
            className="taskList"
            style={{ borderImage: s.borderImage }}
          >
            <div className="headerTask">
              <div className="barTitle">
                <h6 style={{ color: s.color }}>{s.status}</h6>
              </div>
            </div>
            <div className="cards">
              {tasks
                .filter((t) => t.assigned_to.includes(username))
                .filter((t) => t.status === s.status)
                .map((t, index) => (
                  <Fragment>
                    <div key={t._id} className="card">
                      <div className="titelTask">
                        <div className="objectTask">{t.object}</div>
                          <Fragment key={t._id}>
                            <button
                              className="editBtn"
                              onClick={() => handleButton(t)}
                            >
                              <FiEdit3
                                style={{ width: "14px", height: "14px" }}
                              />
                            </button>
                            <Modal
                              isOpen={open}
                              onRequestClose={() => setOpen(false)}
                              shouldCloseOnOverlayClick={false}
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
                              <EditTask setOpen={setOpen} taskInfo={taskInfo} />
                            </Modal>
                          </Fragment>
                      </div>
                      <p className="bodytask">{t.content}</p>
                      <div className="footerTask">
                        <div className="btnn">
                          
                        </div>
                        <div className="datetask">
                          {t.createdAt.replace("T", " | ").slice(0, 18)}
                        </div>
                      </div>
                    </div>
                    <ModalEdit t={t} onClose={onClose} show={show} />
                  </Fragment>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Lists;
