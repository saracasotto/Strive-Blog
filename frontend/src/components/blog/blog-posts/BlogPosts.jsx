import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Container, Button } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import './BlogPosts.css';


const BlogPost = ({ post }) => (
  <div className="card blog-post-card mb-3">
    <img src={post.cover} className="card-img" alt={post.title} />
    <div className="card-img-overlay">
      <h5 className="card-title">{post.title}</h5>
      <p className="card-text category">
        {post.category}
      </p>
      <p className="card-text author">
        {post.author ? (
          <>By <strong>{post.author.name} {post.author.surname}</strong></>
        ) : (
          <><strong>Author:</strong> Unknown</>
        )}
      </p>
      <p className="card-text time d-none d-lg-block">
        Reading Time: {post.readTime.value} {post.readTime.unit}
      </p>
      <div className="card-text content mb-2">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
      <Link to={`/blogposts/${post._id}`} className="btn mt-2">Read More</Link>
    </div>
  </div>
);

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

        setPosts((prevPosts) => {
          const newPosts = data.posts.filter(post => !prevPosts.some(prevPost => prevPost._id === post._id));
          return [...prevPosts, ...newPosts];
        });
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

const BlogPosts = () => {
  const postsPerPage = 6; 
  const [currentPage, setCurrentPage] = useState(1); // Pagina corrente
  const [searchQuery, setSearchQuery] = useState(''); // Stato per la ricerca

  const { posts, loading, error } = useFetchPosts(currentPage, postsPerPage);

  // Filtro solo per il titolo dei post
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const loadMorePosts = () => {
    setCurrentPage((prevPage) => prevPage + 1); // Incrementa la pagina
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <Container className='mt-5'>
      {/* Barra di ricerca */}
      <Row className="justify-content-center mb-4">
        <Col md={6}>
          <input
            type="text"
            placeholder="Search posts by title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-control text-center"
          />
        </Col>
      </Row>

      {/* Lista dei post filtrati */}
      <Row className="blog-post-row text-center mt-3">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <Col md={6} lg={4} key={post._id} className="blog-post-container">
              <BlogPost key={post._id} post={post} />
            </Col>
          ))
        ) : (
          <p>No posts available with that title.</p>
        )}
      </Row>

      {/* Pulsante "Load More" */}
      {!loading && (
        <div className="d-flex justify-content-center my-4">
          <Button onClick={loadMorePosts}>Load More</Button>
        </div>
      )}
      {loading && <p>Loading...</p>}
    </Container>
  );
};

export default BlogPosts;
