import React, { useState, useEffect } from 'react';

const Comments = ({ postId, user }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [editedComment, setEditedComment] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null); // Gestisce l'ID del commento in modifica
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`http://localhost:5000/blogposts/${postId}/comments`);
                if (!response.ok) {throw new Error('Error fetching comments');}
                const data = await response.json();
                setComments(data);
            } catch (error) {setError(error.message);}
        };

        fetchComments();
    }, [postId]);

    // AGGIUNTA COMMENTO
    const handleAddComment = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error("JWT Token not found");
          return;
        }
      
        try {
          const response = await fetch(`http://localhost:5000/blogposts/${postId}/comments`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ content: newComment }),
          });
      
          if (!response.ok) {
            throw new Error('Failed to add comment');
          }
      
          const addedComment = await response.json();
          setComments([...comments, addedComment]);
          setNewComment('');
        } catch (error) {
          console.error("Error:", error);
          setError(error.message);
        }
    };

    // ELIMINAZIONE COMMENTO
    const handleDeleteComment = async (commentId) => {
        try {
            const response = await fetch(`http://localhost:5000/blogposts/${postId}/comments/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // JWT Token
                }
            });
            if (!response.ok) {
                throw new Error('Failed to delete comment');
            }
            setComments(comments.filter(comment => comment._id !== commentId)); // Rimuovi il commento dall'array
        } catch (error) {
            setError(error.message);
        }
    };

    // GESTIONE MODIFICA COMMENTO
    const handleEditComment = (commentId, content) => {
        setEditingCommentId(commentId); // Imposta il commento da modificare
        setEditedComment(content); // Imposta il contenuto del commento da modificare
    };

    // AGGIORNA COMMENTO
    const handleUpdateComment = async (commentId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error("JWT Token not found");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/blogposts/${postId}/comments/${commentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ content: editedComment }), // Invia il commento aggiornato
            });

            if (!response.ok) {
                throw new Error('Failed to update comment');
            }

            const updatedComment = await response.json();
            setComments(comments.map(comment => comment._id === commentId ? updatedComment : comment)); // Aggiorna il commento nell'array
            setEditingCommentId(null); // Disabilita la modalità modifica
            setEditedComment('');
        } catch (error) {
            console.error("Error:", error);
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
                        {editingCommentId === comment._id ? (
                            // Modalità modifica commento
                            <div>
                                <textarea 
                                    value={editedComment}
                                    onChange={(e) => setEditedComment(e.target.value)}
                                    rows="3"
                                />
                                <button onClick={() => handleUpdateComment(comment._id)}>Save</button>
                                <button onClick={() => setEditingCommentId(null)}>Cancel</button>
                            </div>
                        ) : (
                            // Modalità visualizzazione normale
                            <div>
                                <p><strong>{comment.author.name} {comment.author.surname}</strong>: {comment.content}</p> {/* Mostra il nome dell'autore */}
                                {user && (
                                    <>
                                        <button onClick={() => handleEditComment(comment._id, comment.content)}>Edit comment</button>
                                        <button onClick={() => handleDeleteComment(comment._id)}>Delete comment</button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <p>No comments yet.</p>
            )}

            {/* Aggiungi nuovo commento solo se l'utente è loggato */}
            {user ? (
                <div className="add-comment">
                    <textarea 
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a comment"
                        rows="3"
                    />
                    <button onClick={handleAddComment}>Add comment</button>
                </div>
            ) : (
                <p>You can only comment if you are logged in</p>
            )}
        </div>
    );
};

export default Comments;
