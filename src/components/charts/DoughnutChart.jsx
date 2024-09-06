import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({data}) => {
  const options = {
    plugins: {
      legend: {
        display: false, 
      },
    },
  };

  return (
    <div className="dashboard-chart-wrapper d-flex justify-content-center">
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
