import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  // Chart data
  const data = {
    labels: ["Male", "Female", "Others"],
    datasets: [
      {
        data: [12, 19, 3,],
        backgroundColor: [
          "rgba(54, 215, 232, 1)",
          "rgba(6, 185, 157, 1)",
          "rgba(254, 112, 150, 1)",
        ],
        borderColor: [
          "rgba(54, 215, 232, 1)",
          "rgba(6, 185, 157, 1)",
          "rgba(254, 112, 150, 1)",
          
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    plugins: {
      legend: {
        display: false, 
      },
    },
  };

  return (
    <div className="doughnutjs-wrapper d-flex justify-content-center">
      <Doughnut data={data} options={options} />
      <div
        id="traffic-chart-legend"
        className="rounded-legend legend-vertical legend-bottom-left pt-4 ms-4 mt-4"
      >
        <ul>
          <li><span style={{ backgroundColor: "rgba(54, 215, 232, 1)" }}></span> Male</li>
          <li><span style={{ backgroundColor: "rgba(6, 185, 157, 1)"}}></span> Female</li>
          <li><span style={{ backgroundColor: "rgba(254, 112, 150, 1)" }}></span> Others</li>
          
        </ul>
      </div>
    </div>
  );
};

export default DoughnutChart;
