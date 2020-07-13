import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../API/index";
import { Line } from "react-chartjs-2";
import './Chart.css';

const Chart = () => {
  const [dailyData, SetDailyData] = useState([]);

  useEffect(() => {
    async function fetchAPI() {
      SetDailyData(await fetchDailyData());
    }

    fetchAPI();
  }, []);

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => new Date(date).toDateString()),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            fill: true,
          },
        ],
        
      }}
    />
  ) : null;

  console.log("Date_Check", dailyData[({ date }) => date]);

  return <div className="container">{lineChart}</div>
};

export default Chart;
