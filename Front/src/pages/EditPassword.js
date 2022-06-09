import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

import axios from "../api/axios";
import Toaster from '../components/Toaster/Toaster'

const EditPassword = () => {

  const navigate = useNavigate();

  const goBack = () => navigate("/profile");

  const navigation = useNavigate;
  const [password, setpassword] = useState("");
  const [id, setid] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("CC_Token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setid(payload.id);
    } else {
        navigation("/");
        Toaster("error", "Unauthorized");
    }
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.put(`/api/users/updatepassword/${id}`, {
      password: password,
    });
    if (response) {
      Toaster("success", "password changed ");
      goBack();
    } else {
      Toaster("error", "something is wrong");
    }
  };

  return (
    <>
      <div className="card3">
        <form onSubmit={handleSubmit}>
          <input
            className="inputpass"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            required
          ></input>
          <button className="btn6">done</button>
        </form>
      </div>
    </>
  );
};

export default EditPassword;
