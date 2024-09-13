import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../Loading";
import { setLoading } from "../../redux/reducers/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import Empty from "../Empty";
import fetchData from "../../helper/apiCall";
import "../../styles/user.css";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const UpcomingAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);

  const getUpcomingAppoint = async (e) => {
    try {
      dispatch(setLoading(true));
      const res = await fetchData("/appointment/getupcomingappointments", {
        limit: 5,
      });
      setAppointments(res.data);
    } catch (error) {
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getUpcomingAppoint();
  }, []);

  const complete = async (ele) => {
    try {
      await toast.promise(
        axios.put(
          "/appointment/completed",
          {
            appointid: ele?._id,
            userId: ele?.userId?._id,
            counsellorId: ele?.counsellorId?._id,
            counsellorname: `${ele?.counsellorId?.firstname} ${ele?.counsellorId?.lastname}`,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          success: "Appointment completed successfully",
          error: "Unable to complete appointment",
          loading: "Completing appointment...",
        }
      );

      getUpcomingAppoint();
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-100">
          {appointments.length > 0 ? (
            <table className="table m-3">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Counsellor</th>
                  <th>Client</th>
                  <th>Appointment Date</th>
                  <th>Appointment Time</th>
                  <th>Booking Date</th>
                  <th>Booking Time</th>
                  <th>Status</th>

                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments?.map((ele, i) => {
                  return (
                    <tr key={ele?._id}>
                      <td className="text-center">{i + 1}</td>
                      <td>
                        {ele?.counsellorId?.firstname +
                          " " +
                          ele?.counsellorId?.lastname}
                      </td>
                      <td>
                        {ele?.userId?.firstname + " " + ele?.userId?.lastname}
                      </td>
                      <td>{ele?.date}</td>
                      <td>{ele?.time}</td>
                      <td>{ele?.createdAt.split("T")[0]}</td>
                      <td>{ele?.updatedAt.split("T")[1].split(".")[0]}</td>
                      <td>{ele?.status}</td>
                      <td>
                        <button
                          className={`btn user-btn accept-btn ${
                            ele?.status === "Completed" ? "disable-btn" : ""
                          }`}
                          disabled={ele?.status === "Completed"}
                          onClick={() => complete(ele)}
                        >
                          Complete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <Empty />
          )}
        </div>
      )}
    </>
  );
};

export default UpcomingAppointments;
