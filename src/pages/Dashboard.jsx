import React from "react";
import AdminApplications from "../components/dashboard/AdminApplications";
import AdminAppointments from "../components/dashboard/AdminAppointments";
import AdminCounsellors from "../components/dashboard/AdminCounsellors";
import Sidebar from "../components/dashboard/Sidebar";
import Users from "../components/dashboard/Users";
import AdminProfile from "../components/dashboard/AdminProfile";
import AdminDashboard from "../components/dashboard/AdminDashboard";

const Dashboard = (props) => {
  const { type } = props;
  return (
    <>
      <section className="layout-section">
        <div className="layout-container">
          <Sidebar />
          {type === "home" ? (
            <AdminDashboard />
          ) : type === "users" ? (
            <Users />
          ) : type === "counsellors" ? (
            <AdminCounsellors />
          ) : type === "applications" ? (
            <AdminApplications />
          ) : type === "appointments" ? (
            <AdminAppointments />
          ) : type === "profile" ? (
            <AdminProfile />
          ) : (
            <></>
          )}
        </div>
      </section>
    </>
  );
};

export default Dashboard;
