import React from 'react';
import Comments from '../comments';

function CS61A() {
  const courseCode = 'CS61A'
  return <h1>test cs61a</h1>,
  <h3><Comments courseCode={courseCode} /> </h3>
  ;
}

export default CS61A;