import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./SinglePost.module.css";
import { Context } from "../../../context/Context";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "../../EditorToolbar/EditorToolbar";
import "react-quill/dist/quill.snow.css";
import { v4 as uuid } from "uuid";
import { deletePost, singlePost, updatePost, updatePostPhoto, urlImg } from "../../../api";
import PopupYesNo from "../../UI/PopupYesNo/PopupYesNo";
import Loading from "../../UI/Loading/Loading"

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [updateMode, setUpdateMode] = useState(false);
  const [displayPopup, setDisplayPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notCorrect, setNotCorrect] = useState(true);
  const [payloadTooLarge, setPayloadTooLarge] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await singlePost(path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setLoading(false);
    };
    getPost();
  }, [path, updateMode]);

  useEffect(() => {
    title && desc ? setNotCorrect(false) : setNotCorrect(true);
    setPayloadTooLarge(false);
  }, [title, desc]);

  const handleDelete = async() => {
    setLoading(true);
    try {
      await deletePost(path, { username: user.username });
      setDisplayPopup(false);
      window.location.replace("/posts");
    } catch (error) {
      console.error(error);
    }
  };
  

  //update post
  const handleUpdate = async() => {
    setLoading(true);
    const updatedPost = {
      username: user.username,
      title,
      desc
    };
    if (file) {
      const data = new FormData();
      const filename = `${uuid()}-${file.name}`;
      data.append("name", filename);
      data.append("file", file);
      updatedPost.photo = filename;
      try {
        await updatePostPhoto(data);
      } catch (error) {
        console.error(error);
      }
    }
    try {
      await updatePost(path, updatedPost);
      setUpdateMode(false);
    } catch (error) {
        console.error(error);
        if (error.message === "Request failed with status code 413") {
          setPayloadTooLarge(true);
      }
    }
  };

  //handle desc change from quill text editor
  const handleDescChange = (value) => {
    setDesc(value);
  }

  return (
    <>
    {loading && !payloadTooLarge ? (
      <Loading />
    ) : (
    <article className={styles.singlePost}>
      <label htmlFor="fileInput" className={styles.imgContainer}>
        {file ? (
          <img 
            className={styles.img}
            src={URL.createObjectURL(file)}
            alt="Post"
          />
          ) : (
          <>
            {post.photo ? (
              <img 
                className={styles.img}
                src={`${urlImg}${post.photo}`}
                alt="Post"
              />
              ) : (
              <>
                {updateMode ? (<i className={`${styles.imgIcon} fa-solid fa-image`}/>) : null}
              </>
              )
            }
          </>
          )
        }
        
      </label>
     
      {updateMode ? (
        <>
          
          <input 
            style={{display:"none"}}
            type="file"
            accept="image/png, image/jpeg"
            id="fileInput"
            onChange={(e) => setFile(e.target.files[0])}/>
          <input 
            autoFocus 
            type="text" 
            value={title} 
            className={styles.title} 
            onChange={(e) => setTitle(e.target.value)}/> 
        </>
      ) : (
        <div className={styles.flexContainer}>
          <h1 className={styles.title}>{title}</h1>

            {user && post.username === user.username && (
            <>
              <i className={`${styles.icon} fa-solid fa-pencil`} onClick={()=>setUpdateMode(true)}></i>
              <i className={`${styles.icon} fa-solid fa-trash-can` } onClick={()=>setDisplayPopup(true)}></i>
               {displayPopup && (
                  <PopupYesNo yes={handleDelete} no={() => setDisplayPopup(false)} message="Czy na pewno chcesz usun???? ten post?"/>
                )}
              
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
      
      {updateMode ? (
          <div className={styles.editor}>
            <EditorToolbar toolbarId={'t1'}/>
            <ReactQuill
                  theme="snow"
                  value={desc}
                  onChange={handleDescChange}
                  placeholder={"Napisz co??..."}
                  modules={modules('t1')}
                  formats={formats}
                />
         </div>
      ) : (
        <div className={`ql-editor ${styles.editor}`} dangerouslySetInnerHTML={{ __html: post.desc}}></div>
      )}
      {updateMode && (
        <button 
          className="button"
          disabled={notCorrect}
          onClick={handleUpdate}>
            Aktualizuj!
        </button>
      )}
      {payloadTooLarge && 
        <p className='error'>Post zajmuje zbyt du???? ilo???? pami??ci!</p>}
    </article>
    )}
    </>
  )
}
