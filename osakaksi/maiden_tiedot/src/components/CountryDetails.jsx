import React from 'react';
import axios from "axios"
import { useState, useEffect } from "react"

const CountryDetails = ({country, setSelectedCountry}) => {
  const [countryData, setCountryData] = useState({})
  const [loading, setLoading] = useState(true)
  const [weatherData, setWeatherData] = useState({})
  const [loadingWeather, setLoadingWeather] = useState(true)
  const APIKey = import.meta.env.VITE_WEATHERAPIKEY

  useEffect(() => {
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country.toString().toLowerCase()}`)
    .then((response) => {
      setCountryData(response.data)
      setLoading(false)
      })
    .catch(error => console.log(error, error.message))
  }, [country]);

  
  useEffect(() => {
    if (loading) {
      return
    } else {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${countryData.capital[0]}&appid=${APIKey}`)
      .then((response) => {
      setWeatherData(response.data)
      setLoadingWeather(false)
      })
    .catch(error => console.log(error, error.message))
  }}, [countryData])
    
    
  
   
  if (loading || loadingWeather || !countryData) {
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
        <button onClick={() => setSelectedCountry(null)}>Return</button>
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
        <h2>Weather in {countryCapital}</h2>
        <p>Temperature: {(weatherData.main.temp - 272.15).toFixed(1)} Celsius</p>
        <p>Weather description: {weatherData.weather[0].description}</p>
        <p><img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="Weather icon" /></p>
        <p>Wind {weatherData.wind.speed.toFixed(1)} m/s</p>
      </div>
    )
  } catch (error) {
    console.log(error, error.message)
  }
  
}

export default CountryDetails