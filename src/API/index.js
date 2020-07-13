// Functions for fetching data from different API(s)
import axios from "axios";

const url = "https://api.thevirustracker.com/free-api?global=stats";

export const fetchData = async () => {
  try {
    const fetched = await fetch(url);
    const response = await fetched.json();
    console.log("checking", response);
    return response;
  } catch (error) {
    console.log("An unfortunate error has occured. Error Details:", error);
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get("https://covid19.mathdro.id/api/daily"); //`${URL}/daily`

    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));

    return modifiedData;
  } catch (error) {
    console.log("An unfortunate error has occured. Error Details:", error);
  }
};

// { data: {confirmed, recovered, deaths, lastUpdate} }
// { confirmed, recovered, deaths, lastUpdate }

// async componentDidMount() {
//     const data = await fetchData();

//     console.log(data);
//   }

export const countries = async () => {
    try {
        const countryData = await axios.get("https://covid19.mathdro.id/api/countries");
    
    console.log(countryData);
    }
    catch (error) {
        console.log("An unfortunate error has occured. Error Details:", error);
    }
}