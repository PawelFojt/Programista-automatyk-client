import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Context } from '../../../../../context/Context';
import styles from './NewPost.module.css';

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("")
  const {user} = useContext(Context);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
      category
    };
    if(file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch(err) {

      }
    }
    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {

    }
  };
  return (
    <div className={styles.newPost}>
      {file && (
        <img 
          className={styles.img}
          src={URL.createObjectURL(file)}
          alt="blog"
        />
        )
      }
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.container}>
          <label htmlFor="fileInput">
            <i className={`${styles.icon} fa-solid fa-plus`}/>
            
          </label>
          <input 
            style={{display:"none"}}
            type="file" 
            id="fileInput"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input 
            className={styles.title}
            type="text" 
            placeholder="Tytuł"
            id="titleInput" 
            autoFocus={true}
            onChange={e=>setTitle(e.target.value)}
          />
        </div>
        <div className={styles.container}>
          <textarea 
            placeholder="Napisz coś..."
            type="text"
            className={styles.desc}
            onChange={e=>setDesc(e.target.value)}
          />
        </div>
        <button className={styles.submitButton} type="submit">Opublikuj</button>
      </form>
    </div>
  )
}
