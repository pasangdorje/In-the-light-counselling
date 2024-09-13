import React, { useEffect, useState } from "react";
import Empty from "../components/Empty";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import fetchData from "../helper/apiCall";
import { setLoading } from "../redux/reducers/rootSlice";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/user.css";
import { getFormattedTime } from "../utils/moment";
import { TablePagination } from "@mui/material";
import useTablePagination from "../components/hooks/useTablePagination";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);
  const { userId } = jwt_decode(localStorage.getItem("token"));
  const {
    page,
    totalRows,
    setTotalRows,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useTablePagination();

  const getAllAppoint = async (e) => {
    try {
      dispatch(setLoading(true));
      const res = await fetchData("/appointment/getallappointments", {
        search: userId,
        page: page + 1,
        limit: rowsPerPage,
      });
      setAppointments(res.data);
      setTotalRows(res.totalRows);
    } catch (error) {
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getAllAppoint();
  }, [page, rowsPerPage]);

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
          loading: "Complete appointment...",
        }
      );

      getAllAppoint();
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <section className="container notif-section">
          <h2 className="page-heading">Your Appointments</h2>

          {appointments.length > 0 ? (
            <div className="appointments w-100">
              <table className="table">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Counsellor</th>
                    <th>Client</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Created Date</th>
                    <th>Status</th>
                    {userId === appointments[0].counsellorId?._id ? (
                      <th>Action</th>
                    ) : (
                      <></>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {appointments?.map((ele, i) => {
                    return (
                      <tr key={ele?._id}>
                        <td>{i + 1}</td>
                        <td>
                          {ele?.counsellorId?.firstname +
                            " " +
                            ele?.counsellorId?.lastname}
                        </td>
                        <td>
                          {ele?.userId?.firstname + " " + ele?.userId?.lastname}
                        </td>
                        <td>{ele?.date}</td>
                        <td> {getFormattedTime(ele?.time)}</td>
                        <td>{ele?.createdAt.split("T")[0]}</td>
                        <td>{ele?.status}</td>
                        {userId === ele?.counsellorId?._id ? (
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
                        ) : (
                          <></>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                page={page}
                component="div"
                count={totalRows}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{
                  "& p": {
                    marginTop: "auto",
                    marginBottom: "auto",
                  },
                }}
              />
            </div>
          ) : (
            <Empty />
          )}
        </section>
      )}
      <Footer />
    </>
  );
};
export default Appointments;
