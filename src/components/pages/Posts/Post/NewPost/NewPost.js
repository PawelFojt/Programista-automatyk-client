import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Context } from '../../../../../context/Context';
import styles from './NewPost.module.css';
import ReactQuill from 'react-quill';
import EditorToolbar, { modules, formats } from "../../../../EditorToolbar/EditorToolbar";
import 'react-quill/dist/quill.snow.css';

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const {user} = useContext(Context);
  const handleSubmit = async(e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
      categories
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
  const onDescChange = (value) => {
    setDesc(value);
  }

  const options = [
    { label: 'Automatyka', value: 'Automatyka' },
    { label: 'Hydraulika', value: 'Hydraulika' },
    { label: 'Pneumatyka', value: 'Pneumatyka' },
  ];
  
  return (
    <div className={styles.newPost}>
      <div className={styles.imgContainer}>
        {file ? (
          <img 
            className={styles.img}
            src={URL.createObjectURL(file)}
            alt="blog"
          />
          ) : null
        }
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.container}>
          <label htmlFor="fileInput">
            <i className={`${styles.icon} fa-solid fa-image`}/>
            dodaj zdjęcie tytułowe
          </label>
          <input 
            style={{display:"none"}}
            type="file" 
            id="fileInput"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label htmlFor="catSelect">Wybierz kategorie:</label>
          <select name="catSelect" defaultValue="Automatyka" className={styles.catSelect} onChange={e=>setCategories(e.target.value)}>
            {options.map((option) => (
              <option className={styles.catOption} value={option.value}>{option.label}</option>
            ))}
          </select>
          <input 
            className={styles.title}
            type="text" 
            placeholder="Tytuł"
            id="titleInput" 
            required="true"
            autoFocus={true}
            onChange={e=>setTitle(e.target.value)}
          />
        </div>
        <div className={styles.editor}>
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
        <button className={styles.button} type="submit">Opublikuj</button>
      </form>
    </div>
  )
}
