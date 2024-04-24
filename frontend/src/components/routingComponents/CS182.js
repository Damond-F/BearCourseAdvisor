import React from 'react';
import Comments from '../comments';

function CS182() {
  const courseCode = 'CS182'
  return <h1>test cs182</h1>,
  <h3><Comments courseCode={courseCode} /> </h3>
  ;
}

export default CS182;