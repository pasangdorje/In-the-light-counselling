import "../styles/counsellorcard.css";
import React, { useState } from "react";
import BookAppointment from "./BookAppointment";
import { toast } from "react-hot-toast";

const CounsellorInfoCard = ({ ele }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const handleModal = () => {
    if (token === "") {
      return toast.error("You must log in first");
    }
    setModalOpen(true);
  };

  return (
    <>
      <div className={`card`}>
        <div className={`card-img flex-center`}>
          <img
            src={
              ele?.userId?.pic ||
              "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
            }
            alt="profile"
          />
        </div>
        <h3 className="card-name">
          {ele?.userId?.firstname + " " + ele?.userId?.lastname}
        </h3>
        <p className="specialization">
          <strong>Specialization: </strong>
          <span className="values">{ele?.specialization}</span>
        </p>
        <p className="experience">
          <strong>Experience: </strong>
          <span className="values">{ele?.experience}yrs</span>
        </p>
        <p className="fees">
          <strong>Fees per session: </strong>{" "}
          <span className="values">$ {ele?.fees}</span>
        </p>
        <p className="phone">
          <strong>Phone: </strong>
          <span className="values">{ele?.userId?.phone}</span>
        </p>
        <button className="btn appointment-btn" onClick={handleModal}>
          Book Appointment
        </button>
      </div>
      {modalOpen && <BookAppointment setModalOpen={setModalOpen} ele={ele} />}
    </>
  );
};

export default CounsellorInfoCard;
