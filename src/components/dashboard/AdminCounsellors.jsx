import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../Loading";
import { setLoading } from "../../redux/reducers/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import Empty from "../Empty";
import fetchData from "../../helper/apiCall";
import "../../styles/user.css";
import { FaUserMd } from "react-icons/fa";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const AdminCounsellors = () => {
  const [counsellors, setCounsellors] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);

  const getAllCounsellors = async (e) => {
    try {
      dispatch(setLoading(true));
      const temp = await fetchData(`/counsellor/getallcounsellors`);
      setCounsellors(temp);
      dispatch(setLoading(false));
    } catch (error) {}
  };

  const deleteUser = async (userId) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete?");
      if (confirm) {
        await toast.promise(
          axios.put(
            "/counsellor/deletecounsellor",
            { userId },
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
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getAllCounsellors();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="user-section">
          <h3 class="page-title">
            <span class="page-title-icon bg-gradient-primary text-white me-2">
              <FaUserMd />
            </span>{" "}
            All Counsellors
          </h3>
          {counsellors.length > 0 ? (
            <div className="user-container">
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
                        <td>{i + 1}</td>
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
                        <td>{ele?.experience}</td>
                        <td>{ele?.specialization}</td>
                        <td>{ele?.fees}</td>
                        <td className="select">
                          <button
                            className="btn user-btn"
                            onClick={() => {
                              deleteUser(ele?.userId?._id);
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
