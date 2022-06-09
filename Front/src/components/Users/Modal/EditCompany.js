import React, { useState, useEffect, Fragment } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import Swal from "sweetalert2";
import axios from "../../../api/axios";
import "./AddForm.scss";

import { Form } from "react-bootstrap";

const EditCompany = (props) => {
  const [id, setid] = useState(props.companyInfo._id);
  const [companyname, setCompanyname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const token = localStorage.getItem("CC_Token");

  useEffect(() => {
    axios
      .get(`/api/company/${id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        setCompanyname(res.data.companyname);
        setAddress(res.data.address);
        setPhone(res.data.phone);
        setid(res.data._id);
        console.log("user: ", res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {}, [companyname, phone, address]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.put(
      `/api/updateCompany/${id}`,
      { companyname: companyname, phone: phone, address: address },
      {
        headers: { Authorization: `bearer ${token}` },
      }
    );
    if (response) {
      props.setEdit(false);
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
    <Fragment className="AddForm">
      <div className="headerUserForm">
        <h2>.Edit Company</h2>
        <button className="addForm" onClick={() => props.setEdit(false)}>
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
        <Form.Group className="mb-2" controlId="formBasicEmail">
          <Form.Label>Company Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Ussername"
            value={companyname}
            onChange={(e) => setCompanyname(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasicEmail">
          <Form.Label>Adress</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter company adress"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasicPassword">
          <Form.Label>Phone number</Form.Label>
          <PhoneInput
            placeholder="Enter phone number"
            value={phone}
            onChange={setPhone}
          />
        </Form.Group>

        <div className="buttonsForm">
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

export default EditCompany;
