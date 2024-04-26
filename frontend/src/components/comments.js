import React, { useState, useEffect } from 'react';
import './comments.css'
import Header from './header'

const Comments = ({ courseCode }) => {
  // Using a state object where keys are course codes and values are arrays of comments
  const [courseComments, setCourseComments] = useState({});

const CommentBox = ({ comment }) => {
  return (
    <div className="comment-box">
      <p>{comment}</p>
    </div>
  );
};

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

  const headerStyle = { textDecoration: 'underline' };

  return (
    <div>
      <Header text={`Comments for ${courseCode}`} />
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={currentComment}
          onChange={handleCommentChange}
          placeholder="Write a comment..."
          style={{ width: '100%', minHeight: '75px', marginTop: '10px', fontSize: '14px' }}
        />
        <button type="submit" style={{backgroundColor: 'lightblue', fontSize: '14px', padding: '10px 20px', marginBottom: '20px'}}>Post Comment</button>
      </form>
      <div className="comment-list">
        {courseComments[courseCode]?.map((comment, index) => (
          <div className='comment-box' style={{padding: '15px', margin: '10px', borderRadius: '5px'}}>
            {comment}
          </div>
        ))}
      </div>
    </div>
  );
};
  
  

export default Comments;

