import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import './BlogPosts.css'

// Componente per la visualizzazione di un singolo post
const BlogPost = ({ post }) => (
  <div className="blog-post">
    <h2>{post.title}</h2>
    <img src={post.cover} alt={post.title} />
    <p><strong>Category:</strong> {post.category}</p>
    <p><strong>Author:</strong> {post.author}</p>
    <p><strong>Read Time:</strong> {post.readTime.value} {post.readTime.unit}</p>
    <div className="post-content">
      {post.content}
    </div>
    <Link to={`/blogposts/${post._id}`} className="read-more-link">Read More</Link>
  </div>
);

// Custom hook per il recupero dei post
const useFetchPosts = (currentPage, postsPerPage) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/blogposts?_page=${currentPage}&_limit=${postsPerPage}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data); // Verifica i dati ricevuti

        setPosts(data.posts);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage, postsPerPage]);

  return { posts, loading, error };
};

// Componente principale per la visualizzazione dei post del blog
const BlogPosts = () => {
  const postsPerPage = 5; // Numero fisso di post per pagina, ora non utilizzato
  const [currentPage] = useState(1); // Definito ma non usato

  const { posts, loading, error } = useFetchPosts(currentPage, postsPerPage);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container className='mt-5'>
      <Row className="blog-post-row text-center mt-3">
        {posts.length > 0 ? (
          posts.map(post => (
            <Col lg={4} key={post._id} className="blog-post-container">
              <BlogPost key={post._id} post={post} />
            </Col>
          ))
        ) : (
          <p>No posts available.</p>
        )}
        {/* Paginazione rimossa */}
      </Row>
    </Container>
  );
};

export default BlogPosts;
