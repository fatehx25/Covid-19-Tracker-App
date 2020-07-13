import React, { useState, useEffect } from 'react'
import { FormControl, NativeSelect } from '@material-ui/core';
import { countries } from '../../API';
const CountrySelect = () => {
    
    let [countriesData, setCountriesData] = useState([]);

    useEffect(() => {
        const fetchCountries = async () => {
            setCountriesData(await countries());
        }
        
        fetchCountries();
    }, [setCountriesData]);
    
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