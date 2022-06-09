import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "../../api/axios";
import Toaster from "../Toaster/Toaster";

import style from "./Landing.module.scss";

const Landing = () => {
  const navigate = useNavigate();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const [username, setUser] = useState("");
  const [password, setPwd] = useState("");

  useEffect(() => {
    usernameRef.current.focus();
    passwordRef.current.focus();
  }, []);

  useEffect(() => {}, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/api/login",
        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      localStorage.setItem("CC_Token", response.data.token);
      setUser("");
      setPwd("");
      if (response) {
        Toaster("success", "logged in ");
        if (response.data.user.role === "CLIENT") {
          navigate("/claims");
        }
        if (response.data.user.role === "DEVELOPER") {
          navigate("/tasksDev");
        }
        if (response.data.user.role === "PROJECT_MANAGER") {
          navigate("/tasks");
        }
      }
    } catch (err) {
      if (err.response?.status === 400) {
        Toaster("error", "Missing Username or Password");
      } else if (err.response?.status === 401) {
        Toaster("error", "Unauthorized");
      }
    }
  };

  return (
    <>
      <div className={style.row}>
        <section className={style.row__block}>
          <h1 className={style.row__block__txt}>
            <span>...</span>
            <br />
            Track Your
            <br />
            <span>Project</span>
            <br />
            Claims
          </h1>
        </section>
        <section className={style.row__block}>
          <form className={style.row__block__login} onSubmit={handleSubmit}>
            <h1>.Login</h1>

            <input
              type="username"
              name="username"
              ref={usernameRef}
              placeholder="Username"
              value={username}
              onChange={(e) => setUser(e.target.value)}
              required
            />
            <input
              type="password"
              name="password"
              ref={passwordRef}
              placeholder="Password"
              value={password}
              onChange={(e) => setPwd(e.target.value)}
              required
            />
            <button type="submit" className="btn">
              SIGN IN
            </button>
          </form>
        </section>
      </div>
    </>
  );
};

export default Landing;
