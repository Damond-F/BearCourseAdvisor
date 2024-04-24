import React, { useState } from 'react'; 

const Comments = ({ courseCode }) => {
    const [comments, setComments] = useState([]); 
    const [comment, setComment] = useState(''); 

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleCommentSubmit = (event) => {
        event.preventDefault();
        if (comment.trim()) {
            setComments([...comments, comment]);
            setComment('');
        
        }
    };

    return (
        <div> 
            <h3>
                Comments for {courseCode}
            </h3>
            <ul>
                {comments.map((comment, index) => (
                    <li key = {index} >{comment}</li>
                ))}
            </ul>
            <form onSubmit={handleCommentSubmit}>
                <textarea
                value = {comment} 
                onChange = {handleCommentChange}
                placeholder = "Write a comment..."
                />
                <button type = "submit"> Post Comment</button>
            </form>
        </div>
     ); 
};

export default Comments; 
