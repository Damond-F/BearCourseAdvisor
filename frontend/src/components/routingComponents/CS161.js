import React from 'react';
import Comments from '../comments';

function CS161() {
  const courseCode = 'CS161'
  return <h1>test cs161</h1>,
  <h3><Comments courseCode={courseCode} /> </h3>
  ;
}

export default CS161;