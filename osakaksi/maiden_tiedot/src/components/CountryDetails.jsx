import React from 'react';
import axios from "axios"
import { useState, useEffect } from "react"

const CountryDetails = ({country}) => {
  const [countryData, setCountryData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country.toString().toLowerCase()}`)
    .then((response) => {
      setCountryData(response.data)
      setLoading(false)
      })
    .catch(error => console.log(error, error.message))
  }, [country]);
  
    
  if (loading || !countryData) {
    return <p>Loading details of selected country...</p>;
  }

  try {
    const countryName = countryData.name.common
    const countryCapital = countryData.capital[0]
    const countryArea = countryData.area
    const countryLanguages = countryData.languages
    const countryFlag = countryData.flags

    return (
      <div>
        <h1>{countryName}</h1>
        <p>Capital: {countryCapital}</p>
        <p>Area: {countryArea}</p>
        <h2>Languages</h2>
        <ul>
          {Object.entries(countryLanguages).map(([code, name]) => {
            return <li key={code}>{name}</li>
          })}
        </ul>
        <img 
          width={200} 
          src={countryFlag["png"]} 
          alt={countryFlag["alt"]} />
      </div>
    )
  } catch (error) {
    console.log(error, error.message)
  }
  
}

export default CountryDetails