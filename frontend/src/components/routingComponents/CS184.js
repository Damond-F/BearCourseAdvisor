import React from 'react';
import Comments from '../comments';

function CS184() {
  const courseCode = 'CS184'
  return <h1>test cs184</h1>,
  <h3><Comments courseCode={courseCode} /> </h3>
  ;
}

export default CS184;