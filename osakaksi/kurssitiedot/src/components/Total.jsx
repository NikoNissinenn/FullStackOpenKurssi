import React from 'react';

const Total = ({parts}) => {
  const sum = parts.reduce((sum, part) => sum + part.exercises, 0)

  return (
    <div>
      <p>Total of {sum} exercises</p>
    </div>
  )
}

export default Total