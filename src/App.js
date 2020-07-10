import React, { useState, useEffect } from 'react';
import { DenseAppBar } from './Components';
//import MainGrid from './Components/MainGrid';
import fetchData from './API';
import DataContext from './API/DataContext';
import './App.css';

function App() {

  let [globalData, setGlobal] = useState( {title: "Loading..."} );

  useEffect( () => {
      async function fetchGlobalData() {
          const fetchedData = await fetchData();
          console.log("Response after fetch:", fetchedData);
      
          setGlobal(fetchedData);
          
          // const apiData = await apiResponse.json();
          // console.log("Data from API", apiData);
          //setGlobal(apiData);
      }
      fetchGlobalData();  
  }, [])

  const dataGlobal = globalData && globalData.results && globalData.results[0];
  const dataGlobal_Cases = dataGlobal && dataGlobal.total_cases; 
  const dataGlobal_Deaths = dataGlobal && dataGlobal.total_deaths;
  const dataGlobal_Recovered = dataGlobal && dataGlobal.total_recovered;
  const dataGlobal_Active = dataGlobal && dataGlobal.total_active_cases;
  const dataGlobal_Serious = dataGlobal && dataGlobal.total_serious_cases;
  const dataGlobal_Unresolved = dataGlobal && dataGlobal.total_unresolved; 

  console.log("done", dataGlobal_Recovered);

  let Data = {
    0: dataGlobal_Cases, 
    1: dataGlobal_Deaths, 
    2: dataGlobal_Recovered,
    3: dataGlobal_Active,
    4: dataGlobal_Serious,
    5: dataGlobal_Unresolved
  };

  return (
    <DataContext.Provider value={Data}>
      <div className="App">
        <DenseAppBar />
      </div>
    </DataContext.Provider> 
  );
}

export default App;


