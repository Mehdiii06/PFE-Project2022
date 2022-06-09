import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ProfileCard from "../components/ProfileCard/Profile";
import NavbarAdmin from "../components/Navbar/NavbarAdmin";
import NavbarClient from "../components/Navbar/NavbarClient";
import NavbarDev from "../components/Navbar/NavbarDev";
import Toaster from '../components/Toaster/Toaster'



const Profile = () => {

  const navigation = useNavigate();
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("CC_Token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setRole(payload.role);
    } else {
      navigation("/");
      Toaster("error", "Unauthorized");
    }
  });

  function rendrebar(props) {
    if (role === "PROJECT_MANAGER") {
      return <NavbarAdmin />;
    } else if (role === "DEVELOPER") {
      return <NavbarDev />;
    } else {
      return <NavbarClient />;
    }
  }

  return (
    <>
      {rendrebar()}
      <ProfileCard />
      
    </>
  );
};

export default Profile;
