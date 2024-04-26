import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Graph from '../graph';
import Comments from '../comments';

function CS10() {
  const courseCode = 'CS184';
  const courseOfficialName = 'COMPSCI184';
  const [gradeDistribution, setGradeDistribution] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/getText') // Modify to your API endpoint URL
      .then(response => {
        console.log("API Response:", response.data);
        const gradeData = response.data.find(course => course.courseName === courseOfficialName);
        setGradeDistribution(gradeData.grades);
      })
      .catch(error => {
        console.error('Failed to fetch grade distribution:', error);
      });
  }, []);

  return (
    <div>
      <h1>Test CS184</h1>
      <Graph gradeDistribution={gradeDistribution} />
      <Comments courseCode={courseCode} />
    </div>
  );
}

export default CS10;
