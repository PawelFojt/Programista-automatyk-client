import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './SinglePost.module.css';
import axios from 'axios';
import { Context } from '../../../context/Context';

export default function SinglePost() {
  const location = useLocation()
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const {user} = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("https://programista-automatyk-api.herokuapp.com/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost()
  }, [path])

  const PF = "http://localhost:5000/images/";
  const handleDelete = async() => {
    try {
      await axios.delete("/posts/" + path, {
        data: {username:user.username},
      });
      window.location.replace("/posts")
    } catch(err) {

    }
  };

  const handleUpdate = async() => {
    try {
      await axios.put("/posts/" + path, {
        username:user.username,
        title, 
        desc
      });
      setUpdateMode(false);
    } catch(err) {

    }
  }
  return (
    <div className={styles.singlePost}>
      <div className={styles.container}>
        {post.photo && (
          <img 
            className={styles.img}
            src={PF + post.photo}
            alt="Post img"
          />
        )}
        {updateMode ? (
          <input 
            autoFocus 
            type="text" 
            value={title} 
            className={styles.title} 
            onChange={(e) => setTitle(e.target.value)}/> 
        ) : (
          <div className={styles.flexContainer}>
            <h1 className={styles.title}>{title}</h1>
            {post.username === user.username && (
              <>
                <i className={`${styles.icon} fa-solid fa-pencil`} onClick={()=>setUpdateMode(true)}></i>
                <i className={`${styles.icon} fa-solid fa-trash-can` } onClick={handleDelete}></i>
              </>
            )}
          </div>
        )}
        <div className={styles.info}>
          <span className={styles.author}>
            Autor:
            <Link to={`/posts/?user=${post.username}`} className={styles.link}>
              {` ${post.username}`}
            </Link>
          </span>
          <span className={styles.date}>
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        <hr/>
        {updateMode ? (
          <textarea 
            value={desc}
            className={styles.desc} 
            onChange={(e) => setDesc(e.target.value)}/>
        ) : (
          <p className={styles.desc}>
            {desc}
          </p>
        )}
        {updateMode && (
          <button 
            className={styles.submitButton} 
            onClick={handleUpdate}>
              Aktualizuj!
          </button>
        )}
      </div>
    </div>
  )
}
