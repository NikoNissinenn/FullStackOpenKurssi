import React from 'react';
import Part from "./Part";

const Content = (props) => {
  const part1 = props.course.parts[0].name;
  const part2 = props.course.parts[1].name;
  const part3 = props.course.parts[2].name;
  const exercises1 = props.course.parts[0].exercises
  const exercises2 = props.course.parts[1].exercises
  const exercises3 = props.course.parts[2].exercises

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