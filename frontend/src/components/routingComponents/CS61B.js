import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Graph from '../graph';
import StarRating from '../rating';
import './textStyles.css'

function CS61B() {
  const courseOfficialName = 'COMPSCI61B';
  const [gradeDistribution, setGradeDistribution] = useState(null);
  const [description, setCourseDescription] = useState(null)
  const [text, setText] = useState('')
  
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

  const [profRatings, setProfRatings] = useState({});
  useEffect(() => {
    // Fetch the professor ratings when the component mounts.
    axios.get(`http://localhost:3001/${courseOfficialName}/profRatings`)
      .then(response => {
        // Assuming the response is the object with professor names as keys
        setProfRatings(response.data);
      })
      .catch(error => {
        // Handle any errors here, such as setting an error message in the state.
        console.error('Error fetching professor ratings:', error);
      });

    // The empty array as the second argument to useEffect means it will run once on mount.
  }, []);


  return (
    <div>
    <h1>CS61B - Data Structures and Algorithms</h1>
    <div className='courseDescription'> {description} </div>
    <div className='courseText'> {cleanText} </div>
    <Graph gradeDistribution={gradeDistribution} />
    {Object.entries(profRatings).map(([professorName, ratingInfo]) => (
      <div key={professorName}>
        <h3>{professorName}</h3>
        <div>Rating: <StarRating rating={parseFloat(ratingInfo.rating.split(' ')[1])} /></div>
        <div>Difficulty: {ratingInfo.difficulty}</div>
        <div>Would Take Again: {ratingInfo.takeAgain}</div>
      </div>
    ))}
    {/* ... other content ... */}
  </div>
  );
}

export default CS61B;
