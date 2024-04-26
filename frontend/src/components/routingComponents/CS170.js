import React from 'react';
import Comments from '../comments';

function CS170() {
  const courseCode = 'CS170'
  return <h1>test cs170</h1>,
  <h3><Comments courseCode={courseCode} /> </h3>
  ;
}

export default CS170;