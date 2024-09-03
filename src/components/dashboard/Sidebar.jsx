import React from "react";
import {
  FaHome,
  FaList,
  FaUser,
  FaUserMd,
  FaUsers,
  FaEnvelope,
} from "react-icons/fa";
import "../../styles/sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../redux/reducers/rootSlice";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sidebar = [
    {
      name: "Home",
      path: "/",
      icon: <FaHome />,
    },
    {
      name: "Users",
      path: "/dashboard/users",
      icon: <FaUsers />,
    },
    {
      name: "Counsellors",
      path: "/dashboard/counsellors",
      icon: <FaUserMd />,
    },
    {
      name: "Appointments",
      path: "/dashboard/appointments",
      icon: <FaList />,
    },
    {
      name: "Applications",
      path: "/dashboard/applications",
      icon: <FaEnvelope />,
    },
    {
      name: "Profile",
      path: "/dashboard/profile",
      icon: <FaUser />,
    },
  ];

  const logoutFunc = () => {
    dispatch(setUserInfo({}));
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <section className="sidebar-section flex-center">
        <div className="sidebar-container">
          <ul>
            <div className="sidebar-title">
              <Link to="/">
                <img src={Logo} alt="logo" />
              </Link>
            </div>
            {sidebar.map((ele, i) => {
              return (
                <li key={i} className="sidebar-nav-item">
                  <NavLink to={ele.path}>
                    <span className="icon">{ele.icon}</span> {ele.name}
                  </NavLink>
                </li>
              );
            })}
          </ul>
          <div className="logout-container pointer-cursor" onClick={logoutFunc}>
            <span className="icon">
              <MdLogout />
            </span>
            <span>Logout</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Sidebar;
