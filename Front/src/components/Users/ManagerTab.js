import React, { useEffect, useState, Fragment } from "react";
import Modal from "react-modal";
import "./Users.scss";

import AddManager from "./Modal/AddManager";
import EditManager from "./Modal/EditManager";

import Swal from "sweetalert2";
import axios from "../../api/axios";
import Toaster from "../Toaster/Toaster";

import { Table } from "react-bootstrap";

import { BsSearch } from "react-icons/bs";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

Modal.setAppElement("#root");

const ManagerTab = () => {
  const [manager, setManager] = useState([]);
  const [delet, setdelet] = useState("");
  const [managerInfo, setManagerInfo] = useState({});
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const [query, setQuery] = useState("");
  const token = localStorage.getItem("CC_Token");

  useEffect(() => {
    axios
      .get("/api/getmangers", {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        const list = res.data.data.users;
        setManager(list);
        setdelet(false);
        console.log("list: ", list.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [delet]);

  function del(data) {
    if (manager.length === 1) {
      Swal.fire({
        title: "You can't delete it !",
        icon: "warning",

        cancelButtonColor: "#d33",
        confirmButtonText: "OK",
      });
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#C7D435",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            "Deleted!",
            "Project Manajer has been deleted.",
            "success",
            del2(data)
          );
        }
      });
    }
  }
  function del2(data) {
    const id = data._id;
    axios
      .delete(`/api/users/${id}`, {
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

  const EditModal = (m) => {
    setEdit(true);
    setManagerInfo(m);
  };

  return (
    <>
      <div className="bar">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search.."
            name="search"
            className="search"
          />
          <div className="icon">
            <BsSearch />
          </div>
        </div>
        <Fragment>
          <button className="add" onClick={() => setAdd(true)}>
            + ADD
          </button>
          <Modal
            isOpen={add}
            onRequestClose={() => setAdd(false)}
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
                borderRadius: "4px",
                outline: "none",
                padding: "30px",
                width: "40rem",
              },
            }}
          >
            <AddManager setAdd={setAdd} />
          </Modal>
        </Fragment>
      </div>
      <div className="tables">
        <Table striped bordered hover className="table">
          <thead variant="dark">
            <tr>
              <th className="id">ID</th>
              <th className="name">Name</th>
              <th className="email">Email</th>
              <th className="company">Company</th>
              <th className="actions">Action</th>
            </tr>
          </thead>
          <tbody>
            {manager.map((manager, index) => (
              <tr key={index}>
                <td className="id">{manager._id}</td>
                <td className="name">{manager.username}</td>
                <td className="email">{manager.email}</td>
                <td className="company">{manager.company}</td>
                <td className="actions">
                  <Fragment className="addTaskk" key={manager._id}>
                    <button className="btnE" onClick={() => EditModal(manager)}>
                      <AiOutlineEdit className="iconE" />
                    </button>
                    <Modal
                      isOpen={edit}
                      onRequestClose={() => setEdit(false)}
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
                      <EditManager
                        setEdit={setEdit}
                        managerInfo={managerInfo}
                      />
                    </Modal>
                  </Fragment>
                  <button className="btnD" onClick={() => del(manager)}>
                    <AiOutlineDelete className="iconD" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default ManagerTab;
