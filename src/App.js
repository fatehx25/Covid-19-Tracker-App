import React, { useState, useEffect } from "react";
import { DenseAppBar } from "./Components";
//import MainGrid from './Components/MainGrid';
import { fetchData } from "./API/";
import DataContext from "./API/DataContext";
import StateContext from "./API/StateContext";
import CountryContext from "./API/CountryContext";
import "./App.css";

function App() {
  let [globalData, setGlobal] = useState({ title: "Loading..." });
  let [checkData, setCheck] = useState(false);

  useEffect(() => {
    async function fetchGlobalData() {
      const fetchedData = await fetchData();

      setGlobal(fetchedData);
      setCheck(true);

      // const apiData = await apiResponse.json();
      // console.log("Data from API", apiData);
      //setGlobal(apiData);
    }
    fetchGlobalData();
  }, []);

  const dataGlobal = globalData && globalData.results && globalData.results[0];
  const dataGlobal_Cases = dataGlobal && dataGlobal.total_cases;
  const dataGlobal_Deaths = dataGlobal && dataGlobal.total_deaths;
  const dataGlobal_Recovered = dataGlobal && dataGlobal.total_recovered;
  const dataGlobal_Active = dataGlobal && dataGlobal.total_active_cases;
  const dataGlobal_Serious = dataGlobal && dataGlobal.total_serious_cases;
  const dataGlobal_Unresolved = dataGlobal && dataGlobal.total_unresolved;
  
 
  console.log("done", dataGlobal_Cases);
  

  let Data = {
    0: dataGlobal_Cases,
    1: dataGlobal_Deaths,
    2: dataGlobal_Recovered,
    3: dataGlobal_Active,
    4: dataGlobal_Serious,
    5: dataGlobal_Unresolved,
    6: checkData,
  };

  let globalState = useState("Global");  

  let indexState = useState(null);

  return (
    <CountryContext.Provider value={indexState}>
      <StateContext.Provider value={globalState}>  
        <DataContext.Provider value={Data}>
          <div className="App">
            {globalData === undefined? "Sorry, the website server seems down! Kindly refresh the page or revisit after some time. We apologize for the inconvenience!": <DenseAppBar />}
          </div>
        </DataContext.Provider>
      </StateContext.Provider>
    </CountryContext.Provider>  
  );
}

export default App;
