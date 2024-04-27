import React, { useState, useEffect } from 'react';
import './comments.css'
import Header from './header'

const Comments = ({ courseCode }) => {
  const [courseComments, setCourseComments] = useState({});
  const [currentComment, setCurrentComment] = useState('');

  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem('comments')) || {};
    setCourseComments(savedComments);
  }, []);

  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(courseComments));
  }, [courseComments]);

  const handleCommentChange = (event) => {
    setCurrentComment(event.target.value);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (currentComment.trim()) {
      const updatedComments = {
        ...courseComments,
        [courseCode]: [...(courseComments[courseCode] || []), currentComment],
      };
      setCourseComments(updatedComments);
      setCurrentComment('');
    }
  };

  return (
    <div>
      <Header text={`Comments for ${courseCode}`} />
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={currentComment}
          onChange={handleCommentChange}
          placeholder="Write a comment..."
        />
        <button type="submit">Post Comment</button>
      </form>
      <div className="comment-list">
        {courseComments[courseCode]?.map((comment, index) => (
          <div key={index} className='comment-box'>
            {comment}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
