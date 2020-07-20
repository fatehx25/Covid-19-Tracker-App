import React, { useState, useEffect } from 'react'
import { FormControl, NativeSelect } from '@material-ui/core';
import { fetchCountries } from '../../API';
const CountrySelect = () => {
    
    let [countriesData, setCountriesData] = useState([]);

    useEffect(() => {
        const fetchNation = async () => {
            setCountriesData(await fetchCountries());
        }
        
        fetchNation();
    }, []);
    
    console.log("Countries", countriesData);

    

    return (
        <FormControl>
            <NativeSelect>
                <option value="global">Global</option>
            </NativeSelect>
        </FormControl>
    )
}

export default CountrySelect;