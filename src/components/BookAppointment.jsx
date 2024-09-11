import React, { useEffect, useState } from "react";
import "../styles/bookappointment.css";
import axios from "axios";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BOOKING_SLOTS } from "../constants/appointmentSlots";
import fetchData from "../helper/apiCall";
import { FaExclamationCircle } from "react-icons/fa";
import moment from "moment";
import { isNotPastDate } from "../utils/moment";

const BookAppointment = ({ setModalOpen, ele }) => {
  const [selectedSlot, setSelectedSlot] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);

  const formik = useFormik({
    initialValues: {
      subject: "",
      type: "",
      date: "",
      time: "",
    },
    validationSchema: Yup.object({
      subject: Yup.string().required("Subject is required"),
      type: Yup.string().required("Counselling type is required"),
      date: Yup.string().required("Date is required"),
      time: Yup.string().required("Time is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        await toast.promise(
          axios.post(
            "/appointment/bookappointment",
            {
              counsellorId: ele?.userId?._id,
              subject: values.subject,
              type: values.type,
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
      } finally {
        setSubmitting(false);
      }
    },
  });

  const selectSlot = (slotIndex) => {
    if (availableSlots[slotIndex].available) {
      setSelectedSlot(availableSlots[slotIndex].value);
      formik.setFieldValue("time", availableSlots[slotIndex].value);
    } else {
      toast("The time slot is already booked!", {
        icon: <FaExclamationCircle />,
      });
    }
  };

  const fetchCounsellorAppointments = async () => {
    try {
      const res = await fetchData("/appointment/getallappointments", {
        search: ele.userId._id,
        date: formik.values.date,
      });

      getAvailableAppointmentSlots(res.data);
    } catch (error) {}
  };

  const getAvailableAppointmentSlots = (bookings) => {
    const slots = BOOKING_SLOTS.map((slot) => {
      return {
        ...slot,
        available:
          !bookings.find((b) => b.time === slot.value) &&
          isNotPastDate(formik.values.date, slot.value),
      };
    });

    setAvailableSlots(slots);
  };

  useEffect(() => {
    if (formik?.values?.date) {
      fetchCounsellorAppointments();
    }
  }, [formik.values.date]);

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
              <label htmlFor="subject">Subject:</label>
              <div className="input-group input-custom">
                <input
                  type="text"
                  name="subject"
                  placeholder="Enter subject"
                  className="form-control form-input"
                  value={formik.values.subject}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.subject && formik.errors.subject ? (
                <div className="error-msg">{formik.errors.subject}</div>
              ) : null}

              <label htmlFor="type" className="mt-3">
                Type
              </label>
              <div className="input-group input-custom">
                <select
                  type="select"
                  name="type"
                  id="type"
                  className="form-control form-input"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">Select type</option>
                  <option value="individual">Individual</option>
                  <option value="couple">Couple</option>
                  <option value="family">Family</option>
                </select>
              </div>
              {formik.touched.type && formik.errors.type ? (
                <div className="error-msg">{formik.errors.type}</div>
              ) : null}

              <label htmlFor="date" className="mt-3">
                Select Date:
              </label>
              <div className="input-group input-custom">
                <input
                  type="date"
                  name="date"
                  min={moment().format("YYYY-MM-DD")}
                  className="form-control form-input"
                  value={formik.values.date}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.date && formik.errors.date ? (
                <div className="error-msg">{formik.errors.date}</div>
              ) : null}

              {formik.values.date && (
                <>
                  <label className="mt-3">Select Timeslot:</label>

                  <div className="slots-container mb-0">
                    {availableSlots.map((slot, i) => (
                      <div
                        key={i}
                        className={`time-slots ${
                          slot.available
                            ? selectedSlot === slot.value
                              ? "active"
                              : ""
                            : "booked"
                        }`}
                        onClick={() => selectSlot(i)}
                      >
                        {slot.label}
                      </div>
                    ))}
                    <input
                      type="time"
                      name="time"
                      hidden
                      className="form-control form-input"
                      value={formik.values.time}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  {formik.touched.time && formik.errors.time ? (
                    <div className="error-msg">{formik.errors.time}</div>
                  ) : null}
                </>
              )}
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="btn form-btn mt-3"
              >
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
