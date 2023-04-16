import { useState } from 'react'

const Person = ({ persons, filterName }) => {
  let filteredPersons = [...persons]
  if (filterName == ''){
  } else {
    filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
  }
  return filteredPersons.map(person => <div key={person.id}>{person.name} {person.number}</div>)
}

const Filter = ({ handleFilter }) => (
  <div>
    filter shown with <input
                      onChange={handleFilter}
                      />
  </div>
)

const PersonForm = ( props ) => (
  <form onSubmit={props.addPerson}>
    <div>
      name: <input 
            value={props.newName}
            onChange={props.handleNameChange}
            />
    </div>
    <div>
      number: <input 
              value={props.newNumber}
              onChange={props.handleNumberChange}
            />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    console.log(event.target.value)
    setFilterName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    if (persons.some(obj => {
        if (obj.name === personObject.name) {
          return true;
        }
        return false;
        }
      )){
      alert(`${personObject.name} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} />
      <h2>add a new</h2>
      <PersonForm 
        addPerson={addPerson}
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange} 
      />
      <h2>Numbers</h2>
      <Person persons={persons} filterName={filterName} />
    </div>
  )
}

export default App