import React, { useState, useEffect } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { Button } from "react-bootstrap";

const yourUserId = "123";

export default function BlogLike({ defaultLikes, onChange }) {
  const [likes, setLikes] = useState(defaultLikes);
  const iLikedThisArticle = likes.includes(yourUserId);

  const toggleLike = () => {
    if (iLikedThisArticle) {
      setLikes(likes.filter((id) => id !== yourUserId));
    } else {
      setLikes([...likes, yourUserId]);
    }
  };

  useEffect(() => {
    // Chiama onChange ogni volta che likes cambia
    if (onChange) {
      onChange(likes);
    }
  }, [likes, onChange]); // Aggiungi likes e onChange all'array delle dipendenze

  return (
    <div>
      <Button
        onClick={toggleLike}
        variant={iLikedThisArticle ? "dark" : "dark-outline"}
      >
        <AiOutlineLike /> {`${likes.length} like`}
      </Button>
    </div>
  );
}
