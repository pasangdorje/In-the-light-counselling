import React from "react";
import "../styles/bookappointment.css";
import axios from "axios";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import { useFormik } from "formik";
import * as Yup from "yup";

const BookAppointment = ({ setModalOpen, ele }) => {
  // Formik setup with initial values, validation schema, and submit handler
  const formik = useFormik({
    initialValues: {
      date: "",
      time: "",
    },
    validationSchema: Yup.object({
      date: Yup.string().required("Date is required"),
      time: Yup.string().required("Time is required"),
    }),
    onSubmit: async (values) => {
      try {
        await toast.promise(
          axios.post(
            "/appointment/bookappointment",
            {
              counsellorId: ele?.userId?._id,
              date: values.date,
              time: values.time,
              counsellorname: `${ele?.userId?.firstname} ${ele?.userId?.lastname}`,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          ),
          {
            success: "Appointment booked successfully",
            error: "Unable to book appointment",
            loading: "Booking appointment...",
          }
        );
        setModalOpen(false);
      } catch (error) {
        return error;
      }
    },
  });

  return (
    <>
      <div className="modal flex-center">
        <div className="modal__content">
          <h2 className="page-heading">Book Appointment</h2>
          <IoMdClose
            onClick={() => {
              setModalOpen(false);
            }}
            className="close-btn"
          />
          <div className="register-container flex-center book">
            <form className="register-form" onSubmit={formik.handleSubmit}>
              <div className="input-group">
                <input
                  type="date"
                  name="date"
                  className="form-control form-input"
                  value={formik.values.date}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.date && formik.errors.date ? (
                  <div className="error">{formik.errors.date}</div>
                ) : null}
              </div>
              <div className="input-group">
                <input
                  type="time"
                  name="time"
                  className="form-control form-input"
                  value={formik.values.time}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.time && formik.errors.time ? (
                  <div className="error">{formik.errors.time}</div>
                ) : null}
              </div>
              <button type="submit" className="btn form-btn">
                Book
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookAppointment;
