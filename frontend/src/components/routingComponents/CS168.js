import React from 'react';
import Comments from '../comments';

function CS168() {
  const courseCode = 'CS168'
  return <h1>test cs168</h1>,
  <h3><Comments courseCode={courseCode} /> </h3>
  ;
}

export default CS168;