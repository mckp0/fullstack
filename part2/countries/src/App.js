import { useState, useEffect } from "react"
import countryService from "./services/countries"
import Filter from "./components/Filter"
import Results from "./components/Results"

const App = () => {
  const [results, setResults] = useState([])

  const handleFilter = (event) => {
    console.log(event.target.value)
    if (event.target.value == "") {
      setResults([])
    } else {
      countryService
        .getByName(event.target.value)
        .then((results) => setResults(results))
    }
  }

  return (
    <div>
      <Filter handleFilter={handleFilter} />
      <Results results={results} />
    </div>
  )
}

export default App
