import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Graph from '../graph';
import Comments from '../comments';

function CS10() {
  const courseCode = 'CS186';
  const courseOfficialName = 'COMPSCI186';
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
      <h1>Test CS186</h1>
      <Graph gradeDistribution={gradeDistribution} />
      <Comments courseCode={courseCode} />
    </div>
  );
}

export default CS10;
