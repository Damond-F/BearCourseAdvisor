import React, { useState, useEffect } from 'react';

const Comments = ({ courseCode }) => {
  // Using a state object where keys are course codes and values are arrays of comments
  const [courseComments, setCourseComments] = useState({});

  // Load comments from localStorage when the component mounts
  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem('comments')) || {};
    setCourseComments(savedComments);
  }, []);

  // Save comments to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(courseComments));
  }, [courseComments]);

  const [currentComment, setCurrentComment] = useState('');

  const handleCommentChange = (event) => {
    setCurrentComment(event.target.value);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (currentComment.trim()) {
      // Add the comment to the array for the specific course code
      const updatedComments = {
        ...courseComments,
        [courseCode]: [...(courseComments[courseCode] || []), currentComment],
      };
      setCourseComments(updatedComments);
      setCurrentComment('');
    }
  };
  
// In your Comments component in the frontend
const postComment = async (comment) => {
    try {
      const response = await fetch(`http://localhost:3000/${courseCode}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment }),
      });
      const updatedClass = await response.json();
      // Update local state if needed, for example:
      postComment(updatedClass.comments);
    } catch (error) {
      // Handle errors, e.g., by setting an error state and displaying a message to the user
      console.error('There was an error posting the comment:', error);
    }
  };
  

  return (
    <div>
      <h3>Comments for {courseCode}</h3>
      <ul>
        {courseComments[courseCode]?.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={currentComment}
          onChange={handleCommentChange}
          placeholder="Write a comment..."
        />
        <button type="submit">Post Comment</button>
      </form>
    </div>
  );
};

export default Comments;
