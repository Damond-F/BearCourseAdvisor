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
  
  const postComment = async (courseCode, comment) => {
    const response = await fetch(`http://localhost:3000/comments/${courseCode}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comment }),
    });
  
    if (!response.ok) {
      // Handle errors
      console.error('Failed to post comment');
    } else {
      const updatedComments = await response.json();
      // Update your state with the new comments list
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
