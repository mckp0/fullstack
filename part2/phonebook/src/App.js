import { useState, useEffect } from "react";
import PersonForm from "./components/PerformForm";
import Person from "./components/Person";
import Filter from "./components/Filter";
import personService from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    personService.getAll().then((persons) => setPersons(persons));
  }, []);

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    console.log(event.target.value);
    setFilterName(event.target.value);
  };

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}`)) {
      personService
        .del(person.id)
        .catch(error => {
          alert(
            `${person.name} was already deleted from the server`
          )
        });
      personService.getAll().then((persons) => setPersons(persons));
    } else {
      console.log("delete aborted");
    }
  };

  const addPerson = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons[persons.length - 1].id + 1,
    };

    if (persons.some((obj) => obj.name === personObject.name)) {
      if (
        persons.some(
          (obj) =>
            obj.name === personObject.name && obj.number === personObject.number
        )
      ) {
        alert(`${personObject.name} is already added to phonebook`);
      } else {
        if (window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)) {
          const oldPerson = persons.find((obj) => obj.name === personObject.name)
          personService
            .update(oldPerson.id, { ...personObject, id: oldPerson.id })
            .then((updatedPerson) => {
              setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person))
              setNewName("");
              setNewNumber("");
            } )
            .catch(error => {
              alert(
                `the change was already updated in the server`
              )
            })
        } else {
          setNewName("");
          setNewNumber("");
        }
        
      }
    } else {
      setPersons(persons.concat(personObject));
      personService.create(personObject).then((person) => {
        setPersons(persons.concat(person));
        setNewName("");
        setNewNumber("");
      });
    }
  };

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
      <Person
        persons={persons}
        filterName={filterName}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
