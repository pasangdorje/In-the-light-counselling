import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../Loading";
import { setLoading } from "../../redux/reducers/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import Empty from "../Empty";
import fetchData from "../../helper/apiCall";
import { FaUsers } from "react-icons/fa";
import useTablePagination from "../hooks/useTablePagination";
import { TablePagination } from "@mui/material";
import ConfirmationModal from "../ConfirmationModal";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const Users = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [users, setUsers] = useState([]);
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

  const openAcceptModal = (userId) => {
    setSelectedUser(userId);
    setOpenModal(true);
  };

  const getAllUsers = async (e) => {
    try {
      dispatch(setLoading(true));
      const res = await fetchData(`/user/getallusers`, {
        page: page + 1,
        limit: rowsPerPage,
      });
      setUsers(res.data);
      setTotalRows(res.totalRows);
    } catch (error) {
    } finally {
      dispatch(setLoading(false));
    }
  };

  const deleteUser = async () => {
    try {
      await toast.promise(
        axios.delete("/user/deleteuser", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          data: { userId: selectedUser },
        }),
        {
          pending: "Deleting in...",
          success: "User deleted successfully",
          error: "Unable to delete user",
          loading: "Deleting user...",
        }
      );
      getAllUsers();
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [page, rowsPerPage]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="user-section">
          <h3 className="page-title">
            <span className="page-title-icon bg-gradient-primary text-white me-2">
              <FaUsers />
            </span>{" "}
            All Users
          </h3>
          {users.length > 0 ? (
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
                    <th>Gender</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((ele, i) => {
                    return (
                      <tr key={ele?._id}>
                        <td className="text-center">{i + 1}</td>
                        <td>
                          <img
                            className="user-table-pic"
                            src={ele?.pic}
                            alt={ele?.firstname}
                          />
                        </td>
                        <td>{ele?.firstname}</td>
                        <td>{ele?.lastname}</td>
                        <td>{ele?.email}</td>
                        <td>{ele?.phone}</td>
                        <td>{ele?.gender}</td>
                        <td>
                          <button
                            className="btn user-btn"
                            onClick={() => {
                              openAcceptModal(ele?._id);
                            }}
                          >
                            Remove
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
                onConfirm={deleteUser}
                message="Are you sure you want to remove this user?"
                title="Remove User"
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

export default Users;
