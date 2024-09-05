// components/CommentDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CommentDetails = () => {
    const { commentId } = useParams();
    const [comment, setComment] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComment = async () => {
            try {
                const response = await fetch(`http://localhost:5000/blogposts/:id/comments/${commentId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setComment(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchComment();
    }, [commentId]);

    if (error) return <p>Error: {error}</p>;

    return (
        <div className='comment-details-container'>
            {comment ? (
                <div className='comment-details'>
                    <p>{comment.content}</p>
                    <p><strong>Comment ID:</strong> {comment._id}</p>
                </div>
            ) : (
                <p>Comment not found.</p>
            )}
        </div>
    );
};

export default CommentDetails;
