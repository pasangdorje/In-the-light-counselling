import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../Loading";
import { setLoading } from "../../redux/reducers/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import Empty from "../Empty";
import fetchData from "../../helper/apiCall";
import "../../styles/user.css";
import { FaUserTie } from "react-icons/fa";
import useTablePagination from "../hooks/useTablePagination";
import { TablePagination } from "@mui/material";
import ConfirmationModal from "../ConfirmationModal";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const AdminCounsellors = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [counsellors, setCounsellors] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);

  const openAcceptModal = (userId) => {
    setSelectedUser(userId);
    setOpenModal(true);
  };

  const {
    page,
    totalRows,
    setTotalRows,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useTablePagination();

  const getAllCounsellors = async (e) => {
    try {
      dispatch(setLoading(true));
      const res = await fetchData(`/counsellor/getpaginatedcounsellors`, {
        page: page + 1,
        limit: rowsPerPage,
      });
      setCounsellors(res.data);
      setTotalRows(res.totalRows);
    } catch (error) {
    } finally {
      dispatch(setLoading(false));
    }
  };

  const deleteUser = async () => {
    try {
      await toast.promise(
        axios.put(
          "/counsellor/deletecounsellor",
          { userId: selectedUser },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          success: "Counsellor deleted successfully",
          error: "Unable to delete Counsellor",
          loading: "Deleting Counsellor...",
        }
      );
      getAllCounsellors();
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getAllCounsellors();
  }, [page, rowsPerPage]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="user-section">
          <h3 className="page-title">
            <span className="page-title-icon bg-gradient-primary text-white me-2">
              <FaUserTie />
            </span>
            All Counsellors
          </h3>
          {counsellors.length > 0 ? (
            <div className="user-container appointments mt-4">
              <table className="table">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Pic</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Mobile No.</th>
                    <th>Experience</th>
                    <th>Specialization</th>
                    <th>Fees</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {counsellors?.map((ele, i) => {
                    return (
                      <tr key={ele?._id}>
                        <td className="text-center">{i + 1}</td>
                        <td>
                          <img
                            className="user-table-pic"
                            src={ele?.userId?.pic}
                            alt={ele?.userId?.firstname}
                          />
                        </td>
                        <td>{ele?.userId?.firstname}</td>
                        <td>{ele?.userId?.lastname}</td>
                        <td>{ele?.userId?.email}</td>
                        <td>{ele?.userId?.phone}</td>
                        <td className="text-center">{ele?.experience}</td>
                        <td>{ele?.specialization}</td>
                        <td>$ {ele?.fees}</td>
                        <td className="select">
                          <button
                            className="btn user-btn"
                            onClick={() => {
                              openAcceptModal(ele?.userId?._id);
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

export default AdminCounsellors;
