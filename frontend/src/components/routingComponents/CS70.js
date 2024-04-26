import React from 'react';
import Comments from '../comments';

function CS70() {
  const courseCode = 'CS70'
  return <h1>test cs70</h1>,
  <h3><Comments courseCode={courseCode} /> </h3>
  ;
}

export default CS70;