import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './SinglePost.module.css';
import axios from 'axios';
import { Context } from '../../../context/Context';
import ReactQuill from 'react-quill';
import EditorToolbar, { modules, formats } from "../../EditorToolbar/EditorToolbar";
import 'react-quill/dist/quill.snow.css';


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
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost()
  }, [path, updateMode])

  const PF = "/images/";
  const handleDelete = async() => {
    try {
      await axios.delete("/posts/" + path, {
        data: {username:user.username},
      });
      window.location.replace("/posts")
    } catch(err) {
      console.log(err);
    }
  };
  
  
  console.log(desc);
  const handleUpdate = async() => {
    try {
      await axios.patch("/posts/" + path, {
        username:user.username,
        title, 
        desc
      });
      setUpdateMode(false);
    } catch(err) {
      console.log(err);
    }
  }

  const onDescChange = (value) => {
    setDesc(value);
  }
  return (
    <div className={styles.singlePost}>
      <div className={styles.imgContainer}>
        {post.photo ? (
          <img 
            className={styles.img}
            src={PF + post.photo}
            alt="Post img"
          />
        ) : null}
      </div>
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

            {user && post.username === user.username && (
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
        <span className={styles.cat}>
          Kategoria:
          <Link to={`/posts/?cat=${post.categories}`} className={styles.link}>
            {` ${post.categories}`}
          </Link>
        </span>
        <span className={styles.date}>
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <hr/>
      {updateMode ? (
         <div className={styles.container}>
         <EditorToolbar toolbarId={'t1'}/>
         <ReactQuill
               theme="snow"
               value={desc}
               onChange={onDescChange}
               placeholder={"Napisz coś..."}
               modules={modules('t1')}
               formats={formats}
             />
         </div>
      ) : (
        <div className="ql-editor" dangerouslySetInnerHTML={{ __html: post.desc}}></div>
      )}
      {updateMode && (
        <button 
          className={styles.button} 
          onClick={handleUpdate}>
            Aktualizuj!
        </button>
      )}
    </div>
  )
}
