import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Comments = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`http://localhost:5000/blogposts/${postId}/comments`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setComments(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchComments();
    }, [postId]);

    const handleDeleteComment = async (commentId) => {
        try {
            const response = await fetch(`http://localhost:5000/blogposts/${postId}/comments/${commentId}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setComments(comments.filter(comment => comment._id !== commentId));
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="comments-section">
            <h3>Comments</h3>
            {error && <p>Error: {error}</p>}
            {comments.length > 0 ? (
                comments.map(comment => (
                    <div key={comment._id} className="comment">
                        <p>{comment.content}</p>
                        <Link to={`/blogposts/:id/comments/${comment._id}`}>View Details</Link>
                        <button onClick={() => handleDeleteComment(comment._id)}>Delete</button>
                    </div>
                ))
            ) : (
                <p>No comments yet.</p>
            )}
        </div>
    );
};

export default Comments;

