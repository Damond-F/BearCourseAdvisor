import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Graph from '../graph';
import Comments from '../comments';

function CS70() {
  const courseOfficialName = 'COMPSCI70';
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
      <h1>Test CS70</h1>
      <Graph gradeDistribution={gradeDistribution} />
    </div>
  );
}

export default CS70;
