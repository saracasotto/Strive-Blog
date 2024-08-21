import React, { useState, useEffect } from 'react';
import Pagination from './Pagination'; // Componente per la paginazione

// Modello dei dati del blog
const BlogPost = ({ post }) => (
  <div className="blog-post">
    <h2>{post.title}</h2>
    <img src={post.cover} alt={post.title} />
    <p><strong>Category:</strong> {post.category}</p>
    <p><strong>Author:</strong> {post.author}</p>
    <p><strong>Read Time:</strong> {post.readTime.value} {post.readTime.unit}</p>
    <div dangerouslySetInnerHTML={{ __html: post.content }} />
  </div>
);

const BlogPosts = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/blogPosts?_page=${currentPage}&_limit=${postsPerPage}`);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const totalCount = response.headers.get('X-Total-Count');
        const data = await response.json();

        setPosts(data);
        setTotalPosts(parseInt(totalCount, 10));
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [currentPage, postsPerPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.map(post => (
        <BlogPost key={post._id} post={post} />
      ))}
      <Pagination
        totalItems={totalPosts}
        itemsPerPage={postsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default BlogPosts;
