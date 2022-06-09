import React, { useEffect, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import "./Users.scss";

import AddCompany from "./Modal/AddCompany";
import EditCompany from "./Modal/EditCompany";

import Swal from "sweetalert2";
import axios from "../../api/axios";
import Toaster from "../Toaster/Toaster";

import { Table } from "react-bootstrap";

import { BsSearch } from "react-icons/bs";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

Modal.setAppElement("#root");

const CompaniesTab = () => {
  const navigate = useNavigate();
  const [company, setCompany] = useState([]);
  const [delet, setdelet] = useState("");
  const [query, setQuery] = useState("");
  const [companyInfo, setCompanyInfo] = useState({});
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);

  const token = localStorage.getItem("CC_Token");

  useEffect(() => {
    axios
      .get("/api/getallcompany", {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        const list = res.data.data.companies;
        setCompany(list);
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
          "Company has been deleted.",
          "success",
          del2(data)
        );
      }
    });
  }
  function del2(data) {
    const id = data._id;
    axios
      .delete(`/api/deleteCompany/${id}`, {
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
    setEdit(true);
    setCompanyInfo(d);
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
            <AddCompany setAdd={setAdd} />
          </Modal>
        </Fragment>
      </div>
      <div className="tables">
        <Table striped bordered hover className="table">
          <thead variant="dark">
            <tr>
              <th className="name">Company name</th>
              <th className="email">Address</th>
              <th className="company">Phone</th>
              <th className="actions">Action</th>
            </tr>
          </thead>
          <tbody>
            {company
              .filter(
                (c) =>
                  c.companyname.toLowerCase().includes(query) ||
                  c.address.toLowerCase().includes(query) ||
                  c.phone.toLowerCase().includes(query)
              )
              .map((c, index) => (
                <tr key={index}>
                  <td className="name">{c.companyname}</td>
                  <td className="email">{c.address}</td>
                  <td className="company">{c.phone}</td>
                  <td className="actions">
                    <Fragment className="addTaskk" key={c._id}>
                      <button className="btnE" onClick={() => EditModal(c)}>
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
                        <EditCompany
                          setEdit={setEdit}
                          companyInfo={companyInfo}
                        />
                      </Modal>
                    </Fragment>
                    <button className="btnD" onClick={() => del(c)}>
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

export default CompaniesTab;
