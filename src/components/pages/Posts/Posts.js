import React, { useState, useEffect } from 'react';
import styles from'./Posts.module.css';
import Post from './Post/Post';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const {search} = useLocation();
 

  useEffect(() =>{
    const fetchPosts = async ()=>{
      const res = await axios.get("/posts"+search);
      setPosts(res.data);
    }
    fetchPosts();
  }, [search])
  return (
    <div className={styles.posts}>
      {posts.map((p) => (
        <Post key={p._id} post={p} />
      ))}
     
    </div>
  );
}

