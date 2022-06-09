import React, { useEffect, useState, Fragment } from "react";
import Modal from "react-modal";
import "./Users.scss";

import AddDeveloper from "./Modal/AddDeveloper";
import EditDeveloper from './Modal/EditDeveloper'

import Swal from "sweetalert2";
import axios from "../../api/axios";
import Toaster from "../Toaster/Toaster";

import { Table } from "react-bootstrap";

import { BsSearch } from "react-icons/bs";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

Modal.setAppElement("#root");

const ManagerTab = () => {
  
  const [developer, setDeveloper] = useState([]);
  const [delet, setdelet] = useState("");
  const [developerInfo, setDeveloperInfo] = useState({});
  const [addD, setAddD] = useState(false);
  const [editD, setEditD] = useState(false);
  const [query, setQuery] = useState("");
  const token = localStorage.getItem("CC_Token");

  useEffect(() => {
    axios
      .get("/api/devs", {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        const list = res.data.data.users;
        setDeveloper(list);
        setdelet(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [delet]);

  function del(data) {
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
          del2(data),
          "Deleted!",
          "Developer has been deleted.",
          "success"
        );
      }
    });
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

  const EditModal = (d) => {
    setEditD(true);
    setDeveloperInfo(d);
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
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="icon">
            <BsSearch />
          </div>
        </div>
        <Fragment>
          <button className="add" onClick={() => setAddD(true)}>
            + ADD
          </button>
          <Modal
            isOpen={addD}
            onRequestClose={() => setAddD(false)}
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
            <AddDeveloper setAddD={setAddD} />
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
              <th className="action">Action</th>
            </tr>
          </thead>
          <tbody>
            {developer
              .filter(
                (developer) =>
                  developer.username.toLowerCase().includes(query) ||
                  developer._id.toLowerCase().includes(query)
              )
              .map((developer, index) => (
                <tr key={index}>
                  <td className="id">{developer._id}</td>
                  <td className="name">{developer.username}</td>
                  <td className="email">{developer.email}</td>
                  <td className="company">{developer.company}</td>
                  <td className="actions">
                  <Fragment key={developer._id}>
                    <button
                      className="btnE"
                      onClick={() => EditModal(developer)}
                    >
                      <AiOutlineEdit className="iconE" />
                    </button>
                    <Modal
                      isOpen={editD}
                      onRequestClose={() => setEditD(false)}
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
                      <EditDeveloper
                        setEditD={setEditD}
                        developerInfo={developerInfo}
                      />
                    </Modal>
                  </Fragment>
                    <button className="btnD" onClick={() => del(developer)}>
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
