import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./BlogPostDetails.css";
import Comments from '../blog-comments/Comments';
import { Row, Container } from 'react-bootstrap';

const BlogPostDetails = () => {
    const { id } = useParams(); // Ottieni l'ID del post dalla route
    const [post, setPost] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [comments, setComments] = useState([]); // Stato per i commenti
    const [newComment, setNewComment] = useState(''); // Stato per il nuovo commento
    const [user, setUser] = useState(null); // Stato per l'utente loggato

    // Fetch per ottenere i dettagli del post
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`http://localhost:5000/blogposts/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPost(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    // Fetch per ottenere i commenti
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`http://localhost:5000/blogposts/${id}/comments`);
                if (!response.ok) {
                    throw new Error('Error fetching comments');
                }
                const data = await response.json();
                setComments(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchComments();
    }, [id]);

    // Ottenere l'utente loggato dal localStorage (assumendo che il token JWT sia lì)
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Decodifica del token o invio al backend per verificare l'utente
            // Puoi usare una libreria come jwt-decode per ottenere le informazioni dal token
            const userInfo = { name: "NomeUtente" }; // Sostituisci con la logica di decodifica
            setUser(userInfo);
        }
    }, []);

    // Funzione per inviare un nuovo commento
    const handleAddComment = async () => {
        if (!newComment.trim()) return;

        try {
            const response = await fetch(`http://localhost:5000/blogposts/${id}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Token JWT per l'autenticazione
                },
                body: JSON.stringify({ content: newComment }),
            });

            if (!response.ok) {
                throw new Error('Failed to add comment');
            }

            const addedComment = await response.json();

            // Aggiungi il nuovo commento all'array dei commenti e aggiorna lo stato
            setComments([...comments, addedComment]);
            setNewComment(''); // Resetta il campo di input
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    if (!post) return <p>Post not found.</p>;

    return (
        <Container className="mt-5">
            <Row className="blog-post-details">
                <h2>{post.title}</h2>
                <img src={post.cover} alt={post.title} />
                <p><strong>Category:</strong> {post.category}</p>

                {/* Controllo per renderizzare correttamente l'autore */}
                {post.author ? (
                    <p><strong>Author:</strong> {post.author.name} {post.author.surname}</p>
                ) : (
                    <p><strong>Author:</strong> Unknown</p>
                )}

                <p><strong>Read Time:</strong> {post.readTime.value} {post.readTime.unit}</p>
                <div className="post-content">
                    {post.content}
                </div>

                {/* Se l'utente è loggato, mostra il form per aggiungere un commento */}
                {user ? (
                    <div className="add-comment">
                        <h3>Aggiungi un commento</h3>
                        <textarea 
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Scrivi il tuo commento"
                            rows="4"
                        />
                        <button onClick={handleAddComment}>Invia Commento</button>
                    </div>
                ) : (
                    <p>Devi essere loggato per aggiungere un commento.</p>
                )}

                {/* Mostra i commenti esistenti */}
                <Comments comments={comments} />
            </Row>
        </Container>
    );
};

export default BlogPostDetails;
