import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import "./BlogPostDetails.css";
import Comments from '../blog-comments/Comments';
import { Row, Container } from 'react-bootstrap';

const BlogPostDetails = () => {
    const { id } = useParams(); // Ottieni l'ID dal parametro della rotta
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    if (!post) return <p>Post not found.</p>;

    return (
        <Container className='mt-5'>
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
                <Link to={`/blogposts/${id}/cover`}>Upload New Cover Image</Link>
                <Comments postId={id} />
            </Row>
        </Container>
    );
};

export default BlogPostDetails;
