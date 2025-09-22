import CountryDetails from "./CountryDetails"

const CountriesToShow = ({ filteredCountries }) => {
    if (filteredCountries.length > 10) {
      return (
        <p>Too many matches, specify another filter</p>
      )
    }

    if (filteredCountries.length < 11 && filteredCountries.length > 1) {
      return (
        <div>
          {filteredCountries.map((country) => {
            return <p key={country}>{country}</p>
          })}
        </div>
      )
    }
    
    if (filteredCountries.length === 1) {
      return (
        <CountryDetails
          country={filteredCountries[0]}
        />
      )
    }

    if (filteredCountries.length === 0) {
      return (
        <p>No matches with current filter, specify another filter</p>
      )
    }
  
} 

export default CountriesToShow