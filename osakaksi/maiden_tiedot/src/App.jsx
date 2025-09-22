import { useState, useEffect } from 'react'
import axios from "axios"
import CountriesToShow from './components/Countries';

function App() {
  const [usedFilter, setUsedFilter] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data)
        console.log("Fetched country data")
      }).catch(error => console.log(error))
  }, []);

  const handleFilterChange = (event) => {
    setUsedFilter(event.target.value)
  }

  const countriesToProcess = countries.map((country) => country.name.common)

  const filteredCountries = usedFilter ?
    countriesToProcess.filter((country) => {
      return country.toLowerCase().includes(usedFilter.toLowerCase());
  }) : countriesToProcess;

  return (
    <div>
      <p>Find countries <input type='text' value={usedFilter} onChange={handleFilterChange} name='filterfield' /></p>
      <CountriesToShow 
        filteredCountries={filteredCountries}
      />
    </div>
  )
}

export default App