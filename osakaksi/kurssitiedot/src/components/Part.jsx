const Part = (props) => {
  const name = props.name;
  const exercises = props.exercises;

  return (
    <p>
      {name} {exercises}
    </p>
  )
}

export default Part