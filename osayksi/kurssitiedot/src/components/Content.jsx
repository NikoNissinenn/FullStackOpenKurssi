import React from 'react';

const Content = (props) => {
  const part1 = props.part1;
  const part2 = props.part2;
  const part3 = props.part3;
  const exercises1 = props.exercises1
  const exercises2 = props.exercises2
  const exercises3 = props.exercises3

  return (
    <div>
      <p>
        {part1} {exercises1}
      </p>
      <p>
        {part2} {exercises2}
      </p>
      <p>
        {part3} {exercises3}
      </p>
    </div>
  )
}

export default Content