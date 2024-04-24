import React from 'react';
import Comments from '../comments';


function CS189() {
  const courseCode = 'CS189'
  return <h1>test cs189</h1>,
  <h3><Comments courseCode={courseCode} /> </h3>
  ;
}

export default CS189;