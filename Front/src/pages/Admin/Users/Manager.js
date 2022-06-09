import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import NavbarAdmin from "../../../components/Navbar/NavbarAdmin";
import Toaster from "../../../components/Toaster/Toaster";
import Frame from "../../../components/Frames/aFrame";
import Manager from '../../../components/Users/Manager'
import ChatRoom from '../../../components/ChatRoom/ChatRoom'

const Managers = () => {
  const navigation = useNavigate();
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("CC_Token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setRole(payload.role);
      if (payload.role !== "PROJECT_MANAGER") {
        navigation("/");
        Toaster("error", "Unauthorized");
      }
    } else {
      navigation("/");
      Toaster("error", "Unauthorized");
    }
  });

  return (
    <>
      <NavbarAdmin />
      <Frame contain={<Manager />} chat={<ChatRoom />}/>
    </>
  );
};

export default Managers;
