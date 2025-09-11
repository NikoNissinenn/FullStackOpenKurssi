import React from 'react';
import Part from "./Part";

const Content = (props) => {
  const part1 = props.part1.name;
  const part2 = props.part2.name;
  const part3 = props.part3.name;
  const exercises1 = props.part1.exercises
  const exercises2 = props.part2.exercises
  const exercises3 = props.part3.exercises

  return (
    <div>
      <Part 
        part={part1}
        exercises={exercises1}
      />
      <Part 
        part={part2}
        exercises={exercises2}
      />
      <Part 
        part={part3}
        exercises={exercises3}
      />
    </div>
  )
}

export default Content