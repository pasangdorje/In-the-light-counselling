import React, { useEffect } from "react";
import fetchData from "../../helper/apiCall";
import { getFormattedDay } from "../../utils/moment";

function useLineChartVisualization() {
  const [formattedData, setFormattedData] = React.useState({
    labels: [],
    datasets: [],
  });


  const getLineChartData = async (e) => {
    try {
      const data = await fetchData("/appointment/getTotalBookingsOverTime", {
        interval: "monthly",
      });
      if (data.length) {
        const fData = {
          labels: data.map((d) => getFormattedDay(d._id)),
          datasets: [
            {
              label: "Appointments",
              data: data.map((d) => d.totalBookings),
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              fill: true,
            },
          ],
        };
        setFormattedData(fData);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getLineChartData();
  }, []);

  return {
    formattedData,
  };
}

export default useLineChartVisualization;
