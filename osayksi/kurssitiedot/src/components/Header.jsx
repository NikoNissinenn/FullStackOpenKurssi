import React from 'react';

const Header = (props) => {
  const course = props.course
  
  return (
    <h1>{course}</h1>
  )
}

export default Header