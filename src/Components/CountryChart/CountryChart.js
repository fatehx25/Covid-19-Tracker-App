import React, { useState, useContext, useEffect } from "react";
import axios from 'axios';
import { Line } from "react-chartjs-2";
import IndexContext from '../../API/IndexContext';
import CodeContext from '../../API/CodeContext';
import './CountryChart.css';

const Chart = () => {

    const URL = "https://api.thevirustracker.com/free-api?countryTimeline=";

    const codesArr = useContext(CodeContext);
    const indexArr = useContext(IndexContext);

    let [dailyCountryData, setDailyCountryData] = useState([]);
    let [indexState, setIndexState] = useState(0);
    let src = URL+codesArr[indexState];
    //setIndexState(indexArr);
    const fetchDailyCountryData = async () => {
        try {
        const nationCode = await axios.get(src); //`${URL}/daily`
        console.log("nationCode:", nationCode);
        console.log("nationCode2:", nationCode && nationCode.data && nationCode.data.timelineitems && nationCode.data.timelineitems[0]);
        // const modifiedData = data.map((timelineitems[0]) => ({
        //     confirmed: dailyData.confirmed.total,
        //     deaths: dailyData.deaths.total,
        //     date: dailyData.reportDate,
        // }));
        return nationCode;
        } catch (error) {
        console.log("An unfortunate error has occured. Error Details:", error);
        }
    };

    useEffect(() => {
        async function fetchChartData() {
            setIndexState(indexArr);
            setDailyCountryData(await fetchDailyCountryData());
        }
        
        fetchChartData();
        // eslint-disable-next-line
    }, [indexArr]);  

    console.log("final successx:", Object.entries(dailyCountryData).length);

    const dailyNationData = dailyCountryData && dailyCountryData.data && dailyCountryData.data.timelineitems && dailyCountryData.data.timelineitems[0]; 

    console.log("final successy:", dailyNationData);


    const lineChart_Countries = Object.entries(dailyCountryData).length? (
        <Line
        data={{
            labels: Object.keys(dailyNationData).map( (date) => new Date(date).toDateString() ),
            datasets: [
            {
                data: Object.values(dailyNationData).map(({ new_daily_cases }) => new_daily_cases),
                label: "New Daily Cases",
                backgroundColor: "rgba(104, 102, 235, 0.56)",
                borderColor: "darkblue",
                fill: true,
            },
            {
                data: Object.values(dailyNationData).map(({ new_daily_deaths }) => new_daily_deaths),
                label: "New Daily Deaths",
                borderColor: "darkred",
                backgroundColor: "rgba(255, 0, 0, 0.56)",
                fill: true,
            },
            {
                data: Object.values(dailyNationData).map(({ total_cases }) => total_cases),
                label: "Total Infected",
                backgroundColor: "rgb(255, 49, 49, 0.56)",
                borderColor: "rgb(156, 0, 60)",
                fill: true,
            },
            {
                data: Object.values(dailyNationData).map(({ total_recoveries }) => total_recoveries),
                label: "Total Recoveries",
                backgroundColor: "rgb(76, 218, 20, 0.56)",
                borderColor: "rgb(26, 92, 0)",
                fill: true,
            },
            {
                data: Object.values(dailyNationData).map(({ total_deaths }) => total_deaths),
                label: "Total Deaths",
                backgroundColor: "rgb(2, 180, 180, 0.56)",
                borderColor: "rgb(0, 78, 78)",
                fill: true,
            },
            ],
            
        }}
        />
    ) : null;

    return <div className="container chart-container">{Object.entries(dailyCountryData).length? lineChart_Countries: "Chart is Loading..."}</div>
};

export default Chart;
