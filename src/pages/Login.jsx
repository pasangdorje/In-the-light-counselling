import React, { useState } from "react";
import axios from "axios";
import "../styles/login.css";
import toast from "react-hot-toast";
import fetchData from "../helper/apiCall";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserInfo } from "../redux/reducers/rootSlice";

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [actionInProgress, setActionInProgress] = useState(false);
  const navigate = useNavigate();

  const getUser = async (id) => {
    try {
      const userData = await fetchData(`/user/getuser/${id}`);
      dispatch(setUserInfo(userData));
      if (userData?.isAdmin) {
        return navigate("/dashboard/users");
      } else {
        return navigate("/");
      }
    } catch (error) {
      return error;
    }
  };

  const handleSubmit = async (e) => {
    if (actionInProgress) {
      return;
    }
    try {
      e.preventDefault();
      setActionInProgress(true);
      if (!email || !password) {
        return toast.error("Input field should not be empty");
      }

      const { data } = await toast.promise(
        axios.post("/user/login", {
          email,
          password,
        }),
        {
          pending: "Logging in...",
          success: "Login successfully",
          error: "Unable to login user",
          loading: "Logging user...",
        }
      );
      localStorage.setItem("token", data.token);
      setActionInProgress(false);
      dispatch(setUserInfo(jwt_decode(data.token).userId));
      getUser(jwt_decode(data.token).userId);
    } catch (error) {
      setError(error.response.data);
      return error;
    }
  };

  return (
    <div className="login-container">
      <h2>
        <center>Sign in</center>
      </h2>
      <br></br>
      <p>Log in by entering your email address and password.</p>
      <br></br>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group mb-0">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            autoComplete="off"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error-msg">{error}</div>}
        <button className="login-btn" type="submit">
          Log in
        </button>
      </form>
      <br></br>
      <p>
        <a href="#">Forgot password?</a>
      </p>
      <br></br>
      <p>
        Don't have an account? <a href="register">Sign up here</a>
      </p>
    </div>
  );
}

export default Login;
