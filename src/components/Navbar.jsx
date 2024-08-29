import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faBars,
  faXmark,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/navbar.css";
import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/reducers/rootSlice";
import jwt_decode from "jwt-decode";
import { NavLink } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [nav, setNav] = useState(false);

  const dispatch = useDispatch();
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(
    localStorage.getItem("token")
      ? jwt_decode(localStorage.getItem("token"))
      : ""
  );

  const handleLogoutBtnClick = () => {
    dispatch(setUserInfo({}));
    localStorage.removeItem("token");
    navigate("/login");
  };

  const openNav = () => {
    setNav(!nav);
  };

  const handleLoginBtnClick = () => {
    navigate("/login");
  };

  const handleChatBtnClick = () => {};

  return (
    <div className="navbar-section">
      <h1 className="navbar-title mb-0">
        <Link to="/">
          <img src={Logo} alt="logo" />
        </Link>
      </h1>

      {/* Desktop */}
      <ul className="navbar-items">
        <li>
          <NavLink to="/" className="navbar-links" activeClassName="active">
            Home
          </NavLink>
        </li>

        {!token && (
          <>
            <li>
              <HashLink to="/#services" className="navbar-links">
                Services
              </HashLink>
            </li>
            <li>
              <HashLink to="/#about" className="navbar-links">
                About
              </HashLink>
            </li>
          </>
        )}

        {token && !user.isAdmin && (
          <>
            <li>
              <NavLink
                className="navbar-links"
                activeClassName="active"
                to={"/counsellors"}
              >
                Counsellors
              </NavLink>
            </li>
            <li>
              <NavLink
                className="navbar-links"
                activeClassName="active"
                to={"/appointments"}
              >
                Appointments
              </NavLink>
            </li>
            <li>
              <NavLink
                className="navbar-links"
                activeClassName="active"
                to={"/notifications"}
              >
                Notifications
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                className="navbar-links"
                activeClassName="active"
                to={"/applyforcounsellor"}
              >
                Apply for counsellor
              </NavLink>
            </li> */}
            <li>
              <NavLink
                className="navbar-links"
                activeClassName="active"
                to={"/profile"}
              >
                Profile
              </NavLink>
            </li>
          </>
        )}
        {token && user.isAdmin && (
          <li>
            <NavLink
              className="navbar-links"
              activeClassName="active"
              to={"/dashboard/users"}
            >
              Dashboard
            </NavLink>
          </li>
        )}
      </ul>

      <div className="nav-btn-containers">
        {!token ? (
          <>
            <button
              className="navbar-btn btn-outlined"
              type="button"
              onClick={handleLoginBtnClick}
            >
              Login
            </button>

            <button
              className="navbar-btn"
              type="button"
              onClick={handleChatBtnClick}
            >
              <FontAwesomeIcon icon={faCommentDots} /> Chat
            </button>
          </>
        ) : (
          <>
            <button
              className="navbar-btn"
              type="button"
              onClick={handleLogoutBtnClick}
            >
              <FontAwesomeIcon icon={faRightFromBracket} /> Logout
            </button>
          </>
        )}
      </div>

      {/* Mobile */}
      <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
        <div onClick={openNav} className="mobile-navbar-close">
          <FontAwesomeIcon icon={faXmark} className="hamb-icon" />
        </div>

        <ul className="mobile-navbar-links">
          <li>
            <NavLink onClick={openNav} activeClassName="active" to="/">
              Home
            </NavLink>
          </li>
          {!token && (
            <>
              <li>
                <HashLink to="/#services">Services</HashLink>
              </li>
              <li>
                <HashLink to="/#about">About</HashLink>
              </li>
            </>
          )}

          {token && !user.isAdmin && (
            <>
              <li>
                <NavLink activeClassName="active" to={"/counsellors"}>
                  Counsellors
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/appointments"}
                  className="navbar-links"
                  activeClassName="active"
                >
                  Appointments
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/notifications"}
                  className="navbar-links"
                  activeClassName="active"
                >
                  Notifications
                </NavLink>
              </li>
              {/* <li>
                <NavLink
                  to={"/applyforcounsellor"}
                  className="navbar-links"
                  activeClassName="active"
                >
                  Apply for counsellor
                </NavLink>
              </li> */}
              <li>
                <NavLink
                  to={"/profile"}
                  className="navbar-links"
                  activeClassName="active"
                >
                  Profile
                </NavLink>
              </li>
            </>
          )}
          {token && user.isAdmin && (
            <li>
              <NavLink
                className="navbar-links"
                activeClassName="active"
                to={"/dashboard/users"}
              >
                Dashboard
              </NavLink>
            </li>
          )}
          {!token ? (
            <>
              <li>
                <button
                  className="navbar-btn btn-outlined"
                  type="button"
                  onClick={handleLoginBtnClick}
                >
                  Login
                </button>
              </li>
              <li>
                <button
                  className="navbar-btn"
                  type="button"
                  onClick={handleChatBtnClick}
                >
                  <FontAwesomeIcon icon={faCommentDots} /> Chat
                </button>
              </li>
            </>
          ) : (
            <li>
              <button
                className="navbar-btn"
                type="button"
                onClick={handleLogoutBtnClick}
              >
                <FontAwesomeIcon icon={faRightFromBracket} /> Logout
              </button>
            </li>
          )}
        </ul>
      </div>

      <div className="mobile-nav">
        <FontAwesomeIcon
          icon={faBars}
          onClick={openNav}
          className="hamb-icon"
        />
      </div>
    </div>
  );
}

export default Navbar;
