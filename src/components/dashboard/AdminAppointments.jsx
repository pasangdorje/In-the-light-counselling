import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../Loading";
import { setLoading } from "../../redux/reducers/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import Empty from "../Empty";
import fetchData from "../../helper/apiCall";
import "../../styles/user.css";
import { FaList } from "react-icons/fa";
import { TablePagination } from "@mui/material";
import useTablePagination from "../hooks/useTablePagination";
import ConfirmationModal from "../ConfirmationModal";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const AdminAppointments = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);

  const {
    page,
    totalRows,
    setTotalRows,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useTablePagination();

  const openAcceptModal = (user) => {
    if (submitting) {
      return;
    }
    setSelectedUser(user);
    setOpenModal(true);
  };

  const getAllAppoint = async (e) => {
    try {
      dispatch(setLoading(true));
      const res = await fetchData("/appointment/getallappointments", {
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

  const complete = async () => {
    setSubmitting(true);
    try {
      await toast.promise(
        axios.put(
          "/appointment/completed",
          {
            appointid: selectedUser?._id,
            userId: selectedUser?.userId?._id,
            counsellorId: selectedUser?.counsellorId?._id,
            counsellorname: `${selectedUser?.counsellorId?.firstname} ${selectedUser?.counsellorId?.lastname}`,
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

      getAllAppoint();
    } catch (error) {
      return error;
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="user-section">
          <h3 className="page-title">
            <span className="page-title-icon bg-gradient-primary text-white me-2">
              <FaList />
            </span>{" "}
            All Appointments
          </h3>
          {appointments.length > 0 ? (
            <div className="user-container appointments mt-4">
              <table className="table">
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
                            onClick={() => openAcceptModal(ele)}
                          >
                            Complete
                          </button>
                        </td>
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
              <ConfirmationModal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                onConfirm={complete}
                message="Are you sure you want to mark this appointment as complete?"
                title="Complete Appointment"
              />
            </div>
          ) : (
            <Empty />
          )}
        </section>
      )}
    </>
  );
};

export default AdminAppointments;
