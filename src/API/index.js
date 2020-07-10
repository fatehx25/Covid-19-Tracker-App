// Functions for fetching data from different API(s)

const url = 'https://api.thevirustracker.com/free-api?global=stats';

async function fetchData() {   
    try {
        const fetched = await fetch(url);
        const response = await fetched.json();
        console.log("checking", response);
        return response;
    }

    catch (error) {
        console.log("An unfortunate error has occured. Error Details:", error);
        
    }
}


export default fetchData;


// { data: {confirmed, recovered, deaths, lastUpdate} }
// { confirmed, recovered, deaths, lastUpdate }


// async componentDidMount() {
//     const data = await fetchData();
    
//     console.log(data);
//   }
  