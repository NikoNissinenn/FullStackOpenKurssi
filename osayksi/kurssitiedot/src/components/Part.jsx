const Part = (props) => {
  const part = props.part;
  const exercises = props.exercises;

  return (
    <p>
      {part} {exercises}
    </p>
  )
}

export default Part