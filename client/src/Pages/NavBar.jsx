import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Dropdown from "../Components/dropdown";
import jwt_decode from "jwt-decode";

import "../Styles/NavBar.css";

import Logo from "../images/logo.png";
import T_Logo from "../images/Tlogo.png";

import { Link } from "react-router-dom";

function NavBar() {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [DisplayMenu, setDisplayMenu] = useState(false);
  const [DisplayDropdown, setDisplayDropdown] = useState(false);
  let [, setState] = useState();

  const history = useHistory();

  const HandleLogOut = () => {
    localStorage.removeItem("userDATA");
    localStorage.removeItem("userID");
    setisLoggedIn(false);
    history.push("/");
  };

  const HandleDisplayMenu = () => {
    if (DisplayMenu) {
      setDisplayMenu(false);
    } else {
      setDisplayMenu(true);
    }

    console.log("clicking ");
  };

  const HandleDisplyDropdown = () => {
    if (DisplayDropdown) {
      setDisplayDropdown(false);
    } else {
      setDisplayDropdown(true);
    }

    console.log("clicking ");
  };

  useEffect(() => {
    const token = localStorage.getItem("userDATA");
    if (token) {
      const decoded = jwt_decode(token);
      // Check for expired token
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        setisLoggedIn(false);

        history.push("/login");
      }
      setisLoggedIn(true);
      setState({});
    }
  }, [history]);

  return (
    <>
      <nav className="nav_myways">
        <Link to="/" onClick={HandleDisplayMenu}>
          <div className="menu_bar">
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
        </Link>
        <Link to="/" className="brand-logo">
          <img className="logo_myways" src={Logo} alt="logo" />
        </Link>
        {DisplayDropdown ? <Dropdown /> : <></>}
        <ul className="menu_bar_links">
          <li className="firstULTohide">
            <Link className="Links" to="/#!" onClick={HandleDisplyDropdown}>
              For You
            </Link>
          </li>
          <li className="firstULTohide">
            <Link className="Links" to="/#!">
              <img className="T_Logo" src={T_Logo} alt="Thunder_Icon" />
              <span
                style={{
                  float: "right",
                  padding: "2px",
                }}
              >
                Instant Apply
              </span>
            </Link>
          </li>
          <li className="firstULTohide">
            <Link className="Links" to="/#!">
              Pricing
            </Link>
          </li>
          <li className="firstULTohide">
            <Link className="Links" to="/#!">
              About Us
            </Link>
          </li>

          <ul className="menu_bar_links2">
            {isLoggedIn ? (
              <li onClick={HandleLogOut}>
                <Link className="Links login_signup" to="#!">
                  LOG_OUT
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link className="Links login_signup" to="/register">
                    Signup
                  </Link>
                </li>
                <ul className="ulLInks">
                  <li>
                    <Link className="Links login_signup login_btn" to="/login">
                      Login
                    </Link>
                  </li>
                </ul>
              </>
            )}
          </ul>
        </ul>
      </nav>
      {DisplayMenu === true ? (
        <div className="asidebar">
          <ul className="asidebarMenu">
            <li>
              <Link className="Links" to="/#!">
                For You
              </Link>
            </li>
            <li>
              <Link className="Links" to="/#!">
                Instant Apply
              </Link>
            </li>
            <li>
              <Link className="Links" to="/#!">
                Pricing
              </Link>
            </li>
            <li>
              <Link className="Links" to="/#!">
                About Us
              </Link>
            </li>

            <ul className="asidebarMenu">
              {isLoggedIn ? (
                <li onClick={HandleLogOut}>
                  <Link className="" to="#!">
                    LOG_OUT
                  </Link>
                </li>
              ) : (
                <>
                  <li>
                    <Link className="" to="/register">
                      Signup
                    </Link>
                  </li>
                  <ul className="asidebarMenu">
                    <li>
                      <Link className="" to="/login">
                        Login
                      </Link>
                    </li>
                  </ul>
                </>
              )}
            </ul>
          </ul>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default NavBar;
