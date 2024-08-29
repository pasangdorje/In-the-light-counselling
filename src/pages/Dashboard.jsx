import React from "react";
import AdminApplications from "../components/AdminApplications";
import AdminAppointments from "../components/AdminAppointments";
import AdminCounsellors from "../components/AdminCounsellors";
import Sidebar from "../components/Sidebar";
import Users from "../components/Users";
import Profile from "./Profile";

const Dashboard = (props) => {
  const { type } = props;
  return (
    <>
      <section className="layout-section">
        <div className="layout-container">
          <Sidebar />
          {type === "users" ? (
            <Users />
          ) : type === "counsellors" ? (
            <AdminCounsellors />
          ) : type === "applications" ? (
            <AdminApplications />
          ) : type === "appointments" ? (
            <AdminAppointments />
          ) : type === "profile" ? (
            <Profile />
          ) : (
            <></>
          )}
        </div>
      </section>
    </>
  );
};

export default Dashboard;
