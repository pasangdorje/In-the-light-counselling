import React from "react";
import DoughnutChart from "../charts/DoughnutChart";
import LineChart from "../charts/LineChart";
import { FaHome } from "react-icons/fa";

function AdminDashboard() {
  return (
    <section className="user-section">
      <h3 className="page-title">
        <span className="page-title-icon bg-gradient-primary text-white me-2">
          <FaHome />
        </span>
        Dashboard
      </h3>
      <div className="user-container">
          <div className="row">
            <div className="col-md-4 stretch-card grid-margin">
              <div className="card bg-gradient-danger card-img-holder text-white">
                <div className="card-body">
                  <img
                    src="assets/images/dashboard/circle.svg"
                    className="card-img-absolute"
                    alt="circle-image"
                  />
                  <h4 className="font-weight-normal mb-3">
                    Weekly Sales{" "}
                    <i className="mdi mdi-chart-line mdi-24px float-end" />
                  </h4>
                  <h2 className="mb-5">$ 15,0000</h2>
                  <h6 className="card-text">Increased by 60%</h6>
                </div>
              </div>
            </div>
            <div className="col-md-4 stretch-card grid-margin">
              <div className="card bg-gradient-info card-img-holder text-white">
                <div className="card-body">
                  <img
                    src="assets/images/dashboard/circle.svg"
                    className="card-img-absolute"
                    alt="circle-image"
                  />
                  <h4 className="font-weight-normal mb-3">
                    Weekly Orders{" "}
                    <i className="mdi mdi-bookmark-outline mdi-24px float-end" />
                  </h4>
                  <h2 className="mb-5">45,6334</h2>
                  <h6 className="card-text">Decreased by 10%</h6>
                </div>
              </div>
            </div>
            <div className="col-md-4 stretch-card grid-margin">
              <div className="card bg-gradient-success card-img-holder text-white">
                <div className="card-body">
                  <img
                    src="assets/images/dashboard/circle.svg"
                    className="card-img-absolute"
                    alt="circle-image"
                  />
                  <h4 className="font-weight-normal mb-3">
                    Visitors Online{" "}
                    <i className="mdi mdi-diamond mdi-24px float-end" />
                  </h4>
                  <h2 className="mb-5">95,5741</h2>
                  <h6 className="card-text">Increased by 5%</h6>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-7 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <div className="clearfix">
                    <LineChart />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-5 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Client Gender Distribution</h4>
                  {/* <div className="doughnutjs-wrapper d-flex justify-content-center">
                  <canvas id="traffic-chart" />
                </div>
                <div
                  id="traffic-chart-legend"
                  className="rounded-legend legend-vertical legend-bottom-left pt-4"
                /> */}
                  <DoughnutChart />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 grid-margin">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Recent Bookings</h4>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th> Client </th>
                          <th> Subject </th>
                          <th> Status </th>
                          <th> Last Update </th>
                          <th> Tracking ID </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <img
                              src="assets/images/faces/face1.jpg"
                              className="me-2"
                              alt="profile"
                            />{" "}
                            David Grey
                          </td>
                          <td> Mental depression counseling </td>
                          <td>
                            <label className="badge badge-gradient-success">
                              DONE
                            </label>
                          </td>
                          <td> Dec 5, 2023 </td>
                          <td> WD-12345 </td>
                        </tr>
                        <tr>
                          <td>
                            <img
                              src="assets/images/faces/face2.jpg"
                              className="me-2"
                              alt="profile"
                            />{" "}
                            Stella Johnson
                          </td>
                          <td> Family Counseling </td>
                          <td>
                            <label className="badge badge-gradient-info">
                              ON GOING
                            </label>
                          </td>
                          <td> Dec 12, 2023 </td>
                          <td> WD-12346 </td>
                        </tr>
                        <tr>
                          <td>
                            <img
                              src="assets/images/faces/face3.jpg"
                              className="me-2"
                              alt="profile"
                            />{" "}
                            Marina Michel
                          </td>
                          <td> Substance health Counselling </td>
                          <td>
                            <label className="badge badge-gradient-info">
                              ON GOING
                            </label>
                          </td>
                          <td> Dec 16, 2023</td>
                          <td> WD-12347 </td>
                        </tr>
                        <tr>
                          <td>
                            <img
                              src="assets/images/faces/face4.jpg"
                              className="me-2"
                              alt="profile"
                            />{" "}
                            John Doe
                          </td>
                          <td> Marriage Counselling </td>
                          <td>
                            <label className="badge badge-gradient-danger">
                              CANCELLED
                            </label>
                          </td>
                          <td> Dec 3, 2023 </td>
                          <td> WD-12348 </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </section>
  );
}

export default AdminDashboard;
