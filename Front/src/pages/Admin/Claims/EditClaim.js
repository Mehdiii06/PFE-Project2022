import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Frame from "../../../components/Frames/aFrame";
import ClaimEdit from '../../../components/ClaimsAdmin/ClaimEdit'

import NavbarAdmin from "../../../components/Navbar/NavbarAdmin";
import NavbarClient from "../../../components/Navbar/NavbarClient";
import Toaster from "../../../components/Toaster/Toaster";
import ChatRoom from '../../../components/ChatRoom/ChatRoom'

const EditClaim = () => {
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

  function rendrebar(props) {
    if (role === "PROJECT_MANAGER") {
      return <NavbarAdmin />;
    } else {
      return <NavbarClient />;
    }
  }

  return (
    <>
      {rendrebar()}
      <Frame contain={<ClaimEdit />} chat={<ChatRoom />}/>
    </>
  );
};

export default EditClaim;
