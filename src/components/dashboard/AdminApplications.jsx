import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../Loading";
import { setLoading } from "../../redux/reducers/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import Empty from "../Empty";
import fetchData from "../../helper/apiCall";
import "../../styles/user.css";
import { FaEnvelope } from "react-icons/fa";
import useTablePagination from "../hooks/useTablePagination";
import { TablePagination } from "@mui/material";
import ConfirmationModal from "../ConfirmationModal";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const AdminApplications = () => {
  const [openModal, setOpenModal] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [applications, setApplications] = useState([]);
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

  const getAllApp = async (e) => {
    try {
      dispatch(setLoading(true));
      const res = await fetchData(`/counsellor/getnotcounsellors`, {
        page: page + 1,
        limit: rowsPerPage,
      });
      setApplications(res.data);
      setTotalRows(res.totalRows);
    } catch (error) {
    } finally {
      dispatch(setLoading(false));
    }
  };

  const openAcceptModal = (userId) => {
    setSelectedUser(userId);
    setOpenModal("accept");
  };

  const openRejectModal = (userId) => {
    setSelectedUser(userId);
    setOpenModal("reject");
  };

  const acceptUser = async () => {
    try {
      await toast.promise(
        axios.put(
          "/counsellor/acceptcounsellor",
          { id: selectedUser },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            data: { selectedUser },
          }
        ),
        {
          success: "Application accepted",
          error: "Unable to accept application",
          loading: "Accepting application...",
        }
      );
      getAllApp();
    } catch (error) {
      return error;
    }
  };

  const deleteUser = async () => {
    try {
      await toast.promise(
        axios.put(
          "/counsellor/rejectcounsellor",
          { id: selectedUser },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            data: { selectedUser },
          }
        ),
        {
          success: "Application rejected",
          error: "Unable to reject application",
          loading: "Rejecting application...",
        }
      );
      getAllApp();
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getAllApp();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="user-section">
          <h3 className="page-title">
            <span className="page-title-icon bg-gradient-primary text-white me-2">
              <FaEnvelope />
            </span>{" "}
            All Applications
          </h3>
          {applications.length > 0 ? (
            <div className="user-container appointments mt-4">
              <table className="table">
                <thead>
                  <tr>
                    <th className="text-center">S.No</th>
                    <th>Pic</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Mobile No.</th>
                    <th>Experience</th>
                    <th>Specialization</th>
                    <th>Fees</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {applications?.map((ele, i) => {
                    return (
                      <tr key={ele?._id}>
                        <td className="text-center">{i + 1}</td>
                        <td>
                          <img
                            className="user-table-pic"
                            src={
                              ele?.userId?.pic ||
                              "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                            }
                            alt={ele?.userId?.firstname}
                          />
                        </td>
                        <td>{ele?.userId?.firstname}</td>
                        <td>{ele?.userId?.lastname}</td>
                        <td>{ele?.userId?.email}</td>
                        <td>{ele?.userId?.phone}</td>
                        <td>{ele?.experience}</td>
                        <td>{ele?.specialization}</td>
                        <td>{ele?.fees}</td>
                        <td className="select">
                          <button
                            className="btn user-btn accept-btn"
                            onClick={() => {
                              openAcceptModal(ele?.userId?._id);
                            }}
                          >
                            Accept
                          </button>
                          <button
                            className="btn user-btn"
                            onClick={() => {
                              openRejectModal(ele?.userId?._id);
                            }}
                          >
                            Reject
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
            </div>
          ) : (
            <Empty />
          )}
          <ConfirmationModal
            isOpen={openModal === "accept"}
            onClose={() => setOpenModal(null)}
            onConfirm={acceptUser}
            message="Are you sure you want to accept this applicant as a Counsellor?"
            title="Confirm Counsellor"
          />
          <ConfirmationModal
            isOpen={openModal === "reject"}
            onClose={() => setOpenModal(null)}
            onConfirm={deleteUser}
            message="Are you sure you want to reject this applicant?"
            title="Reject Counsellor"
          />
        </section>
      )}
    </>
  );
};

export default AdminApplications;
