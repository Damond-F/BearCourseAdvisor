import React from 'react';
import Comments from '../comments';

function CS61C() {
  const courseCode = 'CS61C'
  return <h1>test cs61c</h1>,
  <h3><Comments courseCode={courseCode} /> </h3>
  ;
}

export default CS61C;