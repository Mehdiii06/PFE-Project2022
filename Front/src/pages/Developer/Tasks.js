import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Frame from "../../components/Frames/bFrame";
import Tasks from "../../components/TasksDev/Tasks";


import NavbarDev from "../../components/Navbar/NavbarDev";
import Toaster from "../../components/Toaster/Toaster";

const DevTasks = () => {
  const navigation = useNavigate();
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("CC_Token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setRole(payload.role);
      if (payload.role !== "DEVELOPER") {
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
      <NavbarDev />
      <Frame contain={<Tasks />} />
    </>
  );
};

export default DevTasks;
