import React from 'react';
import Comments from '../comments';


function CS188() {
  const courseCode = 'CS188'
  return <h1>test cs188</h1>,
  <h3><Comments courseCode={courseCode} /> </h3>
  ;
}

export default CS188;