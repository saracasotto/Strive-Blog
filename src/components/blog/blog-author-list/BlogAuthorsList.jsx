import React, { useEffect, useState } from 'react';
import BlogAuthor from '../blog-author/BlogAuthor';

const BlogAuthorsList = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch('http://localhost:3001/authors');
        const data = await response.json();
        setAuthors(data);
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
    };

    fetchAuthors();
  }, []);

  return (
    <div>
      {authors.map((author) => (
        <BlogAuthor
          key={author._id}
          name={`${author.nome} ${author.cognome}`}
          avatar={author.avatar}
        />
      ))}
    </div>
  );
};

export default BlogAuthorsList;

