import React, { useState } from "react";
import "../styles/profile.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const ApplyCounsellor = () => {
  const navigate = useNavigate();
  const [formDetails, setFormDetails] = useState({
    specialization: "",
    experience: "",
    fees: "",
  });

  const inputChange = (e) => {
    const { name, value } = e.target;
    return setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const btnClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/counsellor/applyforcounsellor",
        {
          formDetails,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Application submitted successfully.");
      navigate("/");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        toast.error(error.response.data);
      }
    }
  };

  return (
    <>
      <Navbar />
      <section className="register-section flex-center">
        <div className="profile-container flex-center">
          <h2 className="form-heading">Apply for Counsellor</h2>
          <form className="register-form w-50">
            <div className="form-same-row input-group">
              <input
                type="text"
                name="specialization"
                className="form-input"
                placeholder="Enter your specialization"
                value={formDetails.specialization}
                onChange={inputChange}
              />
            </div>
            <div className="form-same-row input-group">
              <input
                type="number"
                name="experience"
                className="form-input"
                placeholder="Enter your experience (in years)"
                value={formDetails.experience}
                onChange={inputChange}
              />
            </div>
            <div className="form-same-row input-group">
              <input
                type="number"
                name="fees"
                className="form-input"
                placeholder="Enter your fees  (in dollars)"
                value={formDetails.fees}
                onChange={inputChange}
              />
            </div>
            <button type="submit" className="btn form-btn" onClick={btnClick}>
              apply
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ApplyCounsellor;
