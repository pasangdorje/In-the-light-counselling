import React, { useEffect } from "react";
import fetchData from "../../helper/apiCall";
import { getFormattedDay } from "../../utils/moment";

function useGenderVisualization() {
  const [genderData, setGenderData] = React.useState({
    labels: [],
    datasets: [],
  });

  const getGenderData = async (e) => {
    try {
      const res = await fetchData("/user/getGenderData");

      if (res) {
        const fData = {
          labels: res.labels,
          datasets: [
            {
              data: res.data,
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
        setGenderData(fData);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getGenderData();
  }, []);

  return {
    genderData,
  };
}

export default useGenderVisualization;
