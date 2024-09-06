import React from "react";
import DoughnutChart from "../charts/DoughnutChart";
import LineChart from "../charts/LineChart";
import { FaHome } from "react-icons/fa";
import "../../styles/dashboard.css";
import UpcomingAppointments from "./UpcomingAppointments";
import useLineChartVisualization from "../hooks/useLineChartVisualization";
import useGenderVisualization from "../hooks/useGenderVisualization";

function AdminDashboard() {
  const { formattedData } = useLineChartVisualization();
  const { genderData } = useGenderVisualization();

  return (
    <section className="user-section">
      <h3 className="page-title">
        <span className="page-title-icon bg-gradient-primary text-white me-2">
          <FaHome />
        </span>
        Dashboard
      </h3>
      <div className="user-container">
        <div className="row">
          <div className="col-xl-7 grid-margin stretch-card">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title m-4">Total Appointment</h5>
                <LineChart data={formattedData} />
              </div>
            </div>
          </div>
          <div className="col-xl-5 grid-margin stretch-card">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title m-4">Client Gender Distribution</h5>
                <DoughnutChart data={genderData} />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title m-4">Upcoming Appointments</h5>
                <UpcomingAppointments />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminDashboard;
