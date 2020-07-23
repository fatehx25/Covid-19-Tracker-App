import React, { useEffect, useState, useContext } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { fetchCountries } from '../../API';
import IndexContext from '../../API/IndexContext';
import Grid from '@material-ui/core/Grid';
import CountryChart from '../CountryChart/CountryChart';
import './CountrySelect.css'; 

const CountrySelect = () => {
    
    let [tempState, setTempState] = useState([]);

    let indexCountry = useContext(IndexContext);

    useEffect(() => {
        const fetchStats = async () => {

            const nationsData = await fetchCountries();
            // const getCountry = nationsData.map( (nation) => (nation.title) );
            // const getCode = nationsData.map( (short) => (short.code) );

            // var index = getCountry.indexOf("Diamond Princess");
            // if (index > -1) {
            //     getCountry.splice(index, 1);
            //     getCountry.splice(-1, 1);
            //     getCode.splice(index, 1);
            //     getCode.splice(-1, 1)
            // }
            // console.log(getCode);
            
            setTempState(nationsData);
        };

        fetchStats();
    }, []);    


    const tryToWin = tempState[indexCountry] && tempState[indexCountry].ourid;

    console.log("Countries Array", tempState[indexCountry]);
    console.log("Country Index", indexCountry);
    if (indexCountry === tryToWin - 1){
        console.log("success", tempState[indexCountry] && tempState[indexCountry].total_cases);
    }

    const countriesDataObject = tempState[indexCountry];
    const totalCases = countriesDataObject && countriesDataObject.total_cases;
    const totalActiveCases = countriesDataObject && countriesDataObject.total_active_cases;
    const totalDeaths = countriesDataObject && countriesDataObject.total_deaths;
    const totalSeriousCases = countriesDataObject && countriesDataObject.total_serious_cases;
    const totalRecovered = countriesDataObject && countriesDataObject.total_recovered;
    const newDeathsToday = countriesDataObject && countriesDataObject.total_new_deaths_today;
    const newCasesToday = countriesDataObject && countriesDataObject.total_new_cases_today;



    const dataCases = {
        labels: ['Infected', 'Active Cases'], 

        datasets: [{
            data: [totalCases, totalActiveCases],
            backgroundColor: ['#0953c2', '#3f05aa'],
            hoverBackgroundColor: ['#0a61e4', '#530adb'],
        }]
    };    

    const dataRecovered = {
        labels: ['Recovered'],
        datasets: [{
            data: [totalRecovered],
            backgroundColor: ['#01b901'],
            hoverBackgroundColor: ['#00d100']
        }]
    }; 

    const dataDeaths = {
        labels: ['Deaths', 'Serious Cases'],
        datasets: [{
            data: [totalDeaths, totalSeriousCases],
            backgroundColor: ['#8b0000', '#c40000'],
            hoverBackgroundColor: ['#5c0101', '#d60303']
        }]
    };

    return (
        <div>
            <Grid container  spacing={3}>
            
                <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={3}>
                    <div className="doughnut">    
                        
                        <Doughnut data={dataCases} height={60} width={60} />
                        
                    </div> 
                    </Grid>
                    <Grid item xs={1}><div className="Case-Box1"> <div className="font-y">New Cases Today</div> <div className="back-note-cases">+{newCasesToday}</div> </div></Grid>
                    <Grid item xs={3}>
                    
                        <Doughnut data={dataRecovered} height={60} width={60} />
                    
                    </Grid>
                    <Grid item xs={1}><div className="Case-Box3"> <div className="font-y">New Deaths Today</div> <div className="back-note-deaths"> +{newDeathsToday}</div> </div></Grid>
                    <Grid item xs={3}>
                    
                        <Doughnut data={dataDeaths} height={60} width={60} />
                    
                    </Grid>
                </Grid>
                </Grid>
                
            </Grid>

            <br/>
            <br/>
            <br/>

            <Grid container spacing={3}>
            
                <Grid item xs={1}></Grid>

                <Grid item xs={10}> <CountryChart /> </Grid>

                <Grid item xs={1}></Grid>
            
            </Grid>
        </div>
    );
}

export default CountrySelect;
