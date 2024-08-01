import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/AppointmentForm.css";
import { ToastContainer, toast } from "react-toastify";

function AppointmentForm() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [gender, setGender] = useState("default");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [preferredMode, setPreferredMode] = useState("default");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form inputs
    const errors = {};
    if (!name.trim()) {
      errors.name = "Name is required";
    } else if (name.trim().length < 8) {
      errors.name = "Name must be at least 8 characters";
    }

    if (!number.trim()) {
      errors.number = "Phone number is required";
    } else if (number.trim().length !== 10) {
      errors.number = "Phone number must be of 10 digits";
    }

    if (gender === "default") {
      errors.gender = "Please select gender";
    }
    if (!appointmentTime) {
      errors.appointmentTime = "Appointment time is required";
    } else {
      const selectedTime = new Date(appointmentTime).getTime();
      const currentTime = new Date().getTime();
      if (selectedTime <= currentTime) {
        errors.appointmentTime = "Please select a future appointment time";
      }
    }
    if (preferredMode === "default") {
      errors.preferredMode = "Please select preferred mode";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Reset form fields and errors after successful submission
    setName("");
    setNumber("");
    setGender("default");
    setAppointmentTime("");
    setPreferredMode("default");
    setFormErrors({});

    toast.success("Appointment Scheduled !", {
      position: toast.POSITION.TOP_CENTER,
      onOpen: () => setIsSubmitted(true),
      onClose: () => setIsSubmitted(false),
    });
  };

  return (
    <div className="appointment-form-section">
      <h1 className="legal-siteTitle">
        <Link to="/">
          In the Light Counselling<span className="legal-siteSign"></span>
        </Link>
      </h1>

      <div className="form-container">
        <h2 className="form-title">
          <span>Book Your Appointment</span>
        </h2>

        <form className="form-content" onSubmit={handleSubmit}>
          <label>
            Full Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {formErrors.name && <p className="error-message">{formErrors.name}</p>}
          </label>

          <br />
          <label>
            Phone Number:
            <input
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
            />
            {formErrors.number && <p className="error-message">{formErrors.number}</p>}
          </label>

          <br />
          <label>
            Gender:
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="default">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="private">I don't want to disclose</option>
            </select>
            {formErrors.gender && <p className="error-message">{formErrors.gender}</p>}
          </label>

          <br />
          <label>
            Preferred Appointment Time:
            <input
              type="datetime-local"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              required
            />
            {formErrors.appointmentTime && <p className="error-message">{formErrors.appointmentTime}</p>}
          </label>

          <br />
          <label>
            Preferred Mode:
            <select
              value={preferredMode}
              onChange={(e) => setPreferredMode(e.target.value)}
              required
            >
              <option value="default">Select</option>
              <option value="voice">Voice Call</option>
              <option value="video">Video Call</option>
            </select>
            {formErrors.preferredMode && <p className="error-message">{formErrors.preferredMode}</p>}
          </label>

          <br />
          <button type="submit" className="text-appointment-btn">
            Confirm Appointment
          </button>

          <p className="success-message" style={{display: isSubmitted ? "block" : "none"}}>Appointment  Details is Submitted and We will confirm you accordingly.</p>
        </form>
      </div>

      <div className="legal-footer">
        <p>© 2024-2025 In the Light Counselling. All rights reserved.</p>
      </div>

      <ToastContainer autoClose={5000} limit={1} closeButton={false} />
    </div>
  );
}

export default AppointmentForm;
