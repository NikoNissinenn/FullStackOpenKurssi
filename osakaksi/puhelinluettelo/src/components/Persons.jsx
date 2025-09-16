const Persons = ({ filteredPersons }) => {
  return (
    <ul>
      {filteredPersons.map((person) => {
        return <li key={person.name}>{person.name} {person.number}</li>
      })}
    </ul>
  )
}

export default Persons