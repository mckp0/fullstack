const Person = ({ persons, filterName, handleDelete }) => {
  let filteredPersons = [...persons]
  if (filterName == ''){
  } else {
    filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
  }
  return filteredPersons.map(person => 
    <div 
      key={person.id}>{person.name} {person.number} <button onClick={() => handleDelete(person)}>delete</button>
    </div>)
}

export default Person