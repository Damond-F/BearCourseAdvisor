import React from 'react';
import Comments from '../comments';

function CS162() {
  const courseCode = 'CS162'
  return <h1>test cs162</h1>,
  <h3><Comments courseCode={courseCode} /> </h3>
  ;
}

export default CS162;