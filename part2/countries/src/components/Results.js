const Results = ({ results, handleShow }) => {
  if (results.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  if (results.length === 1) {
    const country = results[0]
    console.log(country);
    if (country === "error") {
      return <div>No Country Found</div>
    }
    return (
      <div>
        <h1>{country.name.common}</h1>
        <div>capital {country.capital[0]}</div>
        <div>area {country.area}</div>
        <h3>languages:</h3>
        <ul>
          {Object.values(country.languages).map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
        <img
          src={country.flags.png}
          alt={country.flags.alt}
          width="200"
          height="200"
        />
      </div>
    )
  }

  return results.map((country, index) => (
    <div key={index}>
      {country.name.common}{" "}
      <button onClick={() => handleShow(country)}>show</button>{" "}
    </div>
  ))
}

export default Results
