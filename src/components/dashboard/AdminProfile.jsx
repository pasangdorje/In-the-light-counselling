import React, { useEffect, useState } from "react";
import "../../styles/profile.css";
import axios from "axios";
import toast from "react-hot-toast";
import { setLoading } from "../../redux/reducers/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import fetchData from "../../helper/apiCall";
import jwt_decode from "jwt-decode";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaUser } from "react-icons/fa";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

function AdminProfile() {
  const { userId } = jwt_decode(localStorage.getItem("token"));
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);
  const [initialValues, setInitialValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    age: "",
    phone: "",
    gender: "others",
    address: "",
    password: "",
    confpassword: "",
  });
  const [file, setFile] = useState("");

  const getUser = async () => {
    try {
      dispatch(setLoading(true));
      const temp = await fetchData(`/user/getuser/${userId}`);
      setInitialValues({
        firstname: temp.firstname || "",
        lastname: temp.lastname || "",
        email: temp.email || "",
        age: temp.age || "",
        phone: temp.phone || "",
        gender: temp.gender || "others",
        address: temp.address || "",
        password: "",
        confpassword: "",
      });
      setFile(temp.pic);
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      toast.error("Failed to fetch user data");
    }
  };

  useEffect(() => {
    getUser();
  }, [dispatch]);

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    firstname: Yup.string()
      .min(3, "First name must be at least 3 characters")
      .required("First name is required"),
    lastname: Yup.string()
      .min(3, "Last name must be at least 3 characters")
      .required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    age: Yup.number().required("Age is required"),
    phone: Yup.string(),
    gender: Yup.string().required("Gender is required"),
    address: Yup.string().required("Address is required"),
    password: Yup.string().min(5, "Password must be at least 5 characters"),
    confpassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="user-section">
          <h3 className="page-title">
            <span className="page-title-icon bg-gradient-primary text-white me-2">
              <FaUser />
            </span>{" "}
            Admin Profile
          </h3>
          <div className="user-container">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                try {
                  const { password, confpassword, ...rest } = values;
                  if (password !== confpassword) {
                    return toast.error("Passwords do not match");
                  }

                  await toast.promise(
                    axios.put(
                      "/user/updateprofile",
                      { ...rest, password },
                      {
                        headers: {
                          authorization: `Bearer ${localStorage.getItem(
                            "token"
                          )}`,
                        },
                      }
                    ),
                    {
                      pending: "Updating profile...",
                      success: "Profile updated successfully",
                      error: "Unable to update profile",
                    }
                  );

                  resetForm();
                  getUser();
                } catch (error) {
                  toast.error("Unable to update profile");
                } finally {
                  setSubmitting(false);
                }
              }}
              enableReinitialize
            >
              {({ isSubmitting }) => (
                <Form className="edit-profile-form admin-form">
                  <div className="form-same-row input-group">
                    <Field
                      type="text"
                      name="firstname"
                      className="form-input"
                      placeholder="Enter your first name"
                    />
                    <ErrorMessage
                      name="firstname"
                      component="div"
                      className="text-danger"
                    />
                    <Field
                      type="text"
                      name="lastname"
                      className="form-input"
                      placeholder="Enter your last name"
                    />
                    <ErrorMessage
                      name="lastname"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="form-same-row input-group">
                    <Field
                      type="email"
                      name="email"
                      className="form-input"
                      placeholder="Enter your email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger"
                    />
                    <Field as="select" name="gender" className="form-input">
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="others">Others</option>
                    </Field>
                    <ErrorMessage
                      name="gender"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="form-same-row input-group">
                    {/* <Field
                      type="text"
                      name="age"
                      className="form-input"
                      placeholder="Enter your age"
                    /> */}
                    <ErrorMessage
                      name="age"
                      component="div"
                      className="text-danger"
                    />
                    <Field
                      type="text"
                      name="phone"
                      className="form-input"
                      placeholder="Enter your phone number"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-same-row input-group">
                    <Field
                      type="text"
                      name="address"
                      className="form-input text"
                      placeholder="Enter your address"
                      as="textarea"
                      rows="2"
                    />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-same-row input-group">
                    <Field
                      type="password"
                      name="password"
                      className="form-input"
                      placeholder="Enter your password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-danger"
                    />
                    <Field
                      type="password"
                      name="confpassword"
                      className="form-input"
                      placeholder="Confirm your password"
                    />
                    <ErrorMessage
                      name="confpassword"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn form-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Updating..." : "Update"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </section>
      )}
    </>
  );
}

export default AdminProfile;
