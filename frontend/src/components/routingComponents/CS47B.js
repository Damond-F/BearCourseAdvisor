import React from 'react';
import Comments from '../comments';

function CS47B() {
  const courseCode = 'CS47B'
  return <h1>test cs47b</h1>,
  <h3><Comments courseCode={courseCode} /> </h3>
  ;
}

export default CS47B;