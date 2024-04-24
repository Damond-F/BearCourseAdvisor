import React from 'react';
import Comments from '../comments';

function CS186() {
  const courseCode = 'CS186'
  return <h1>test cs186</h1>,
  <h3><Comments courseCode={courseCode} /> </h3>
  ;
}

export default CS186;