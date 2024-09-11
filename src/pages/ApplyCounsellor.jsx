import React from "react";
import "../styles/profile.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useFormik } from "formik";
import * as Yup from "yup";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const ApplyCounsellor = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      specialization: "",
      experience: "",
      fees: "",
    },
    validationSchema: Yup.object({
      specialization: Yup.string().required("Specialization is required"),
      experience: Yup.number()
        .required("Experience is required")
        .min(0, "Experience cannot be negative"),
      fees: Yup.number()
        .required("Fees is required")
        .min(0, "Fees must be positive"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        await axios.post(
          "/counsellor/applyforcounsellor",
          { formDetails: values },
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
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <Navbar />
      <section className="register-section flex-center">
        <div className="profile-container flex-center">
          <h2 className="form-heading">Apply for Counsellor</h2>
          <form className="register-form w-50" onSubmit={formik.handleSubmit}>
            <div className="form-same-row input-group mb-0">
              <input
                type="text"
                name="specialization"
                className="form-input"
                placeholder="Enter your specialization"
                value={formik.values.specialization}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.specialization && formik.errors.specialization ? (
              <div className="error-msg">{formik.errors.specialization}</div>
            ) : null}
            <div className="form-same-row input-group mb-0 mt-3">
              <input
                type="number"
                name="experience"
                className="form-input"
                placeholder="Enter your experience (in years)"
                value={formik.values.experience}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.experience && formik.errors.experience ? (
              <div className="error-msg">{formik.errors.experience}</div>
            ) : null}
            <div className="form-same-row input-group mb-0 mt-3">
              <input
                type="number"
                name="fees"
                className="form-input"
                placeholder="Enter your fees (in dollars)"
                value={formik.values.fees}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.fees && formik.errors.fees ? (
              <div className="error-msg">{formik.errors.fees}</div>
            ) : null}
            <button
              type="submit"
              className="btn form-btn"
              disabled={formik.isSubmitting || !formik.isValid}
            >
              {formik.isSubmitting ? "Submitting..." : "Apply"}
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ApplyCounsellor;
