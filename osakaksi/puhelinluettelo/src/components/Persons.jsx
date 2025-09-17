const Persons = ({ filteredPersons, removePerson }) => {
  return (
    <ul>
      {filteredPersons.map((person) => {
        return <li key={person.name}>{person.name} {person.number} 
        <button onClick={() => removePerson(person.id, person.name)}>Delete</button></li>
      })}
    </ul>
  )
}

export default Persons