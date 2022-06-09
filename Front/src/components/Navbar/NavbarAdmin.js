import React, { useEffect, useState, forwardRef, Fragment } from "react";
import { Link } from "react-router-dom";
import classes from "./NavbarAdmin.module.scss";

import { HiLogout } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { GrNotification } from "react-icons/gr";
import { Navbar, Container, Nav, Dropdown, Image } from "react-bootstrap";

import logo from "../../assets/images/app-logo.png";
//import Dropdown from "../Dropdown/Dropdawn";

const NavbarAdmin = () => {

  const [username, setusername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("CC_Token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setusername(payload.username);
    }
  },[]);

  const [menuOpen, setMenuOpen] = useState(false);
  const [size, setSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (size.width > 768 && menuOpen) {
      setMenuOpen(false);
    }
  }, [size.width, menuOpen]);

  const CustomToggle = forwardRef(({ children, onClick }, ref) => (
    <a
      href="/"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <GrNotification />
    </a>
  ));

  return (
    <Fragment>
      <div className={classes.header}>
        <Navbar expand="lg" className={classes.header__navbar3}>
          <Container className={classes.header__navbar3__Container}>
            <div>
              <Link to="/">
                <Image
                  src={logo}
                  className={classes.header__navbar3__Container__logo}
                />
              </Link>
            </div>
            <div className={classes.header__menuNav}>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className={classes.header__menuNav__nav}>
                  <Nav.Link href="/users/managers">
                    <div className={classes.header__menuNav__nav__NavLink}>
                      Users
                    </div>
                  </Nav.Link>
                  <Nav.Link href="/claimsAdmin">
                    <div className={classes.header__menuNav__nav__NavLink}>
                      Claims
                    </div>
                  </Nav.Link>
                  <Nav.Link href="/Tasks">
                    <div className={classes.header__menuNav__nav__NavLink}>
                      Tasks
                    </div>
                  </Nav.Link>
                  <Dropdown style={{color:"red"}}>
                    <Dropdown.Toggle
                      style={{color:"#333B34", background:"#C7D435", borderColor:"#333B34"}}
                    >
                      {username}
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                      className={classes.header__menuNav__nav__Dropdown__Menu}
                    >
                      <Dropdown.Item
                        href="/profile"
                        className={classes.header__menuNav__nav__Dropdown__Item}
                      >
                        <CgProfile
                          className={
                            classes.header__menuNav__nav__Dropdown__Item__icon
                          }
                        />
                        Profile
                      </Dropdown.Item>
                      <Dropdown.Item
                        href="/logout"
                        className={classes.header__menuNav__nav__Dropdown__Item}
                      >
                        <HiLogout
                          className={
                            classes.header__menuNav__nav__Dropdown__Item__icon
                          }
                        />
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Nav>
              </Navbar.Collapse>
            </div>
          </Container>
        </Navbar>
      </div>
    </Fragment>
  );
};

export default NavbarAdmin;
