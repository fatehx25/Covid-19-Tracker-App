import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../API/index";
import { Line } from "react-chartjs-2";
import './Chart.css';

const Chart = () => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    async function fetchAPI() {
      setDailyData(await fetchDailyData());
    }

    fetchAPI();
  }, []);

  if (dailyData.length) {
    console.log("finalll:", dailyData);
  }
  
  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => new Date(date).toDateString()),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Infected",
            backgroundColor: "rgba(104, 102, 235, 0.56)",
            borderColor: "darkblue",
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "darkred",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            fill: true,
          },
        ],
        
      }}
    />
  ) : null;
      
  if (dailyData.length) {    
    console.log("Checking for Chart Data:", dailyData.map(({ confirmed }) => confirmed));
  }

  return <div className="container chart-container">{lineChart}</div>
};

export default Chart;
