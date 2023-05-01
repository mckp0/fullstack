import { useState, useEffect } from "react"
import countryService from "./services/countries"
import Filter from "./components/Filter"
import Results from "./components/Results"

const App = () => {
  const [results, setResults] = useState([])

  useEffect(() => {}, [results])

  const handleFilter = (event) => {
    console.log(event.target.value)
    if (event.target.value == "") {
      setResults([])
    } else {
      countryService
        .getByName(event.target.value)
        .then((results) => setResults(results))
        .catch((error) => {
          setResults(["error"])
        })
    }
  }

  const handleShow = (country) => {
    console.log(`show ${country.name.common}`)
    setResults([country])
  }

  return (
    <div>
      <Filter handleFilter={handleFilter} />
      <Results results={results} handleShow={handleShow} />
    </div>
  )
}

export default App
