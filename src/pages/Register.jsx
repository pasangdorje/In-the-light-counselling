import React, { useState } from "react";
import axios from "axios";
import "../styles/register.css";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

function Register() {
  const [actionInProgress, setActionInProgress] = useState(false);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      rePassword: "",
      gender: "",
      phone: "",
      address: "",
      termsAccepted: false,
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("Required"),
      lastname: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Required"),
      rePassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
      gender: Yup.string().required("Required"),
      phone: Yup.string()
        .matches(/^[0-9]+$/, "Phone number must be numeric")
        .required("Required"),
      address: Yup.string().required("Required"),
      termsAccepted: Yup.boolean().oneOf(
        [true],
        "You must accept the terms and conditions"
      ),
    }),
    onSubmit: async (values) => {
      if (actionInProgress) {
        return;
      }

      try {
        setActionInProgress(true);
        const data = {
          firstname: values.firstname,
          lastname: values.lastname,
          email: values.email,
          password: values.password,
          gender: values.gender,
          phone: values.phone,
          address: values.address,
          termsAccepted: values.termsAccepted,
        };
        await axios.post("/user/register", data);
        navigate("/login");
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          toast.error(error.response.data);
        }
      } finally {
        setActionInProgress(false);
      }
    },
  });

  return (
    <div className="signup-container">
      <h1 className="navbar-title mb-0">
        <Link to="/">
          <img src={Logo} alt="logo" />
        </Link>
      </h1>
      <br></br>
      <p>Enter your details to create your account.</p>
      <br></br>
      <form onSubmit={formik.handleSubmit}>
        <div className="input-group">
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formik.values.firstname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.firstname && formik.errors.firstname ? (
            <div className="error-msg">{formik.errors.firstname}</div>
          ) : null}
        </div>
        <div className="input-group">
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formik.values.lastname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.lastname && formik.errors.lastname ? (
            <div className="error-msg">{formik.errors.lastname}</div>
          ) : null}
        </div>
        <div className="input-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error-msg">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error-msg">{formik.errors.password}</div>
          ) : null}
        </div>
        <div className="input-group">
          <label htmlFor="rePassword">Re-enter Password</label>
          <input
            type="password"
            id="rePassword"
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.rePassword && formik.errors.rePassword ? (
            <div className="error-msg">{formik.errors.rePassword}</div>
          ) : null}
        </div>
        <div className="input-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {formik.touched.gender && formik.errors.gender ? (
            <div className="error-msg">{formik.errors.gender}</div>
          ) : null}
        </div>
        <div className="input-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className="error-msg">{formik.errors.phone}</div>
          ) : null}
        </div>
        <div className="input-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.address && formik.errors.address ? (
            <div className="error-msg">{formik.errors.address}</div>
          ) : null}
        </div>
        <div className="input-group">
          <label className="checkbox-container d-flex">
            <input
              type="checkbox"
              className="checkbox"
              id="termsAccepted"
              name="termsAccepted"
              checked={formik.values.termsAccepted}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            By creating an account, you agree to the Terms of Service and
            Privacy Policy.
          </label>
          {formik.touched.termsAccepted && formik.errors.termsAccepted ? (
            <div className="error-msg">{formik.errors.termsAccepted}</div>
          ) : null}
        </div>
        <button className="signup-btn" type="submit">
          Sign Up
        </button>
      </form>
      <br />
      <p>
        Already have an account? <a href="login">Log in here</a>
      </p>
    </div>
  );
}

export default Register;
