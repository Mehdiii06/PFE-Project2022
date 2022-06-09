import React, { useEffect, useState, Fragment } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import "./Users.scss";

import Swal from "sweetalert2";
import axios from "../../api/axios";
import Toaster from "../Toaster/Toaster";

import { Table } from "react-bootstrap";

import { BsSearch } from "react-icons/bs";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import AddClaim from "../../pages/Client/AddClaim";

import AddClient from "./Modal/AddClient";
import EditClient from './Modal/EditClient'

Modal.setAppElement("#root");

const ClientTab = () => {
  const navigate = useNavigate();
  const [client, setClient] = useState([]);
  const [delet, setdelet] = useState("");
  const [query, setQuery] = useState("");
  const [clientInfo, setClientInfo] = useState({});
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);

  const token = localStorage.getItem("CC_Token");

  useEffect(() => {
    axios
      .get("/api/clients", {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        const list = res.data.data.users;
        setClient(list);
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
          "Deleted!",
          "Client has been deleted.",
          "success",
          del2(data)
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

  const EditModal = (c) => {
    setEdit(true);
    setClientInfo(c);
  };

  return (
    <>
      <div className="bar">
        <div class="search-container">
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
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              },
              content: {
                position: "relative",
                background: "#fff",
                borderRadius: "4px",
                outline: "none",
                padding: "30px",
                width: '40rem',
              },
            }}
          >
            <AddClient setAdd={setAdd} />
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
            {client
              .filter(
                (client) =>
                  client.username.toLowerCase().includes(query) ||
                  client._id.toLowerCase().includes(query) 
              )
              .map((client) => (
                <tr key={client.id}>
                  <td className="id">{client._id}</td>
                  <td className="name">{client.username}</td>
                  <td className="email">{client.email}</td>
                  <td className="company">{client.company}</td>
                  <td className="actions">
                  <Fragment className="addTaskk" key={client._id}>
                    <button
                      className="btnE"
                      onClick={() => EditModal(client)}
                    >
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
                      <EditClient
                        setEdit={setEdit}
                        clientInfo={clientInfo}
                      />
                    </Modal>
                  </Fragment>
                  <button className="btnD" onClick={() => del(client)}>
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

export default ClientTab;
