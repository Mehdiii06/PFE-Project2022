import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Navbar.module.scss";

import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import logo from "../../assets/images/app-logo.png";

const Navbar = () => {

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

  const menuToggleHandler = () => {
    setMenuOpen((p) => !p);
  };

  return (
    <header className={classes.header}>
      <div className={classes.header__content}>
        <Link to="/">
          <img
            src={logo}
            alt=""
            className={classes.header__content__logo}
            id="logo"
          />
        </Link>
        <nav
          className={`${classes.header__content__nav} ${
            menuOpen ? classes.isMenu : ""
          }`}
        >
          <ul className={classes.header__content__nav__ul}>
            <li>
              <Link to="/contact">
                <a href="/contact">Contact</a>
              </Link>
            </li>
          </ul>
          <Link to="/">
            <button className={classes.header__content__nav__button}>
              LOGIN
            </button>
          </Link>
        </nav>
        <div className={classes.header__content__toggle}>
          {!menuOpen ? (
            <BiMenuAltRight
              onClick={menuToggleHandler}
              style={{ color: "white" }}
            />
          ) : (
            <AiOutlineClose onClick={menuToggleHandler} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
