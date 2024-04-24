import React from 'react';
import Comments from '../comments';
function CS61B() {
  const courseCode = 'CS61B'
  return <h1>test cs61b</h1>,
  <h3><Comments courseCode={courseCode} /> </h3>
  ;
}

export default CS61B;