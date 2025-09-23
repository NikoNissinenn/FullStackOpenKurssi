const Persons = ({ persons, newFilter, removePerson }) => {
  const personsToShow = newFilter ?
      persons.filter((person) => (
        person.name.toLowerCase().includes(newFilter.toLowerCase())
      ))
      : persons
      
  return (
    <ul>
      {personsToShow.map((person) => {
        return <li key={person.id}>{person.name} {person.number} 
        <button onClick={() => removePerson(person.id, person.name)}>Delete</button></li>
      })}
    </ul>
  )
}

export default Persons