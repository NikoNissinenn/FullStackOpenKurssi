import { useState, useEffect } from "react"
import CountryDetails from "./CountryDetails"

const CountriesToShow = ({ filteredCountries }) => {
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    if (filteredCountries.length === 1) {
    setSelectedCountry(filteredCountries[0])
  } else {
    setSelectedCountry(null)
  }
  }, [filteredCountries]);
  

  if (selectedCountry) {
    return (
      <CountryDetails
        country={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />
    )
  }

  if (filteredCountries.length === 0) {
    return (
      <p>No matches with current filter, specify another filter</p>
    )
  }
  
  if (filteredCountries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }

  if (filteredCountries.length < 11 && filteredCountries.length > 1) {
    return (
      <div>
        {filteredCountries.map((country) => {
          return <p key={country}>{country} 
            <button onClick={() => setSelectedCountry(country)}>Show</button></p>
        })}
      </div>
    )
  }  
} 

export default CountriesToShow