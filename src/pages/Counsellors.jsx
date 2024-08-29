import React, { useEffect, useState } from "react";
import CounsellorInfoCard from "../components/CounsellorInfoCard";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/counsellors.css";
import fetchData from "../helper/apiCall";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/reducers/rootSlice";
import Empty from "../components/Empty";

const Counsellors = () => {
  const [counsellors, setCounsellors] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);

  const fetchAllDocs = async () => {
    dispatch(setLoading(true));
    const data = await fetchData(`/counsellor/getallcounsellors`);
    setCounsellors(data);
    dispatch(setLoading(false));
  };

  useEffect(() => {
    fetchAllDocs();
  }, []);

  return (
    <>
      <Navbar />
      {loading && <Loading />}
      {!loading && (
        <section className="container counsellors">
          <h2 className="page-heading">Our Counsellors</h2>
          {counsellors.length > 0 ? (
            <div className="counsellors-card-container">
              {counsellors.map((ele) => {
                return (
                  <CounsellorInfoCard
                    ele={ele}
                    key={ele._id}
                  />
                );
              })}
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

export default Counsellors;
