import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Graph from '../graph';
import Comments from '../comments';

function CS10() {
  const courseOfficialName = 'COMPSCI10';
  const [gradeDistribution, setGradeDistribution] = useState(null);
  const [courseDescription, setCourseDescription] = useState("")
  const [text, setText] = useState("")

  useEffect(() => {
    axios.get('http://localhost:3001/getText') // Modify to your API endpoint URL
      .then(response => {
        console.log("API Response:", response.data);
        const gradeData = response.data.find(course => course.courseName === courseOfficialName);
        const courseData = response.data.find(course => course.courseName === courseOfficialName);
        setGradeDistribution(gradeData.grades);
        setCourseDescription(courseData.description[1])
        setText(courseData.generated_text)
      })
      .catch(error => {
        console.error('Failed to fetch grade distribution:', error);
      });
  }, []);

  const cleanText = text.replace(/[#*]/g, '')

  return (
    <div>
      <div className="courseDescription"> {courseDescription} </div>
      <div className='courseText'> {cleanText} </div>
      <Graph gradeDistribution={gradeDistribution} />
    </div>
  );
}

export default CS10;
