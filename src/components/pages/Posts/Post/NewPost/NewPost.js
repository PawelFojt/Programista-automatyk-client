import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../../../../../context/Context';
import styles from './NewPost.module.css';
import ReactQuill from 'react-quill';
import EditorToolbar, { modules, formats } from "../../../../EditorToolbar/EditorToolbar";
import 'react-quill/dist/quill.snow.css';

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState(["Automatyka"]);
  const {user} = useContext(Context);
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notCorrect, setNotCorrect] = useState(true);
  const [payloadTooLarge, setPayloadTooLarge] = useState(false);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories")
      setCats(res.data)
    }
    getCats();
  }, [])

  useEffect(() => {
    title && desc ? setNotCorrect(false)  : setNotCorrect(true)
    setPayloadTooLarge(false);
    setLoading(false);
  },[title, desc]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
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
        console.log(err)
        
      }
    }
    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {
      console.log(err)
      if (err.message === "Request failed with status code 413") {
        setPayloadTooLarge(true)
      } 
    }
  };

  const onDescChange = (value) => {
    setDesc(value);
  };

  const options = cats.map((c) => ({ label: c.name, value: c.name }));
  console.log(payloadTooLarge)
  return (
    <div className={styles.newPost}>
      {loading && !payloadTooLarge ? (
      <div className="loading"><div></div><div></div><div></div><div></div></div>
    ) : (
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formContainer}>
        <label htmlFor="fileInput" className={styles.imgContainer}>
        {file ? (
          <img 
            className={styles.img}
            src={URL.createObjectURL(file)}
            alt="Post"
          />
          ) : ( <i className={`${styles.icon} fa-solid fa-image`}/>)
        }
      </label>
          <input 
            style={{display:"none"}}
            type="file"
            accept="image/png, image/jpeg"
            id="fileInput"
            onChange={(e) => setFile(e.target.files[0])}
          />
          
          <label htmlFor="catSelect">Wybierz kategorie:</label>
          <select name="catSelect" className={styles.catSelect} onChange={e=>setCategories([e.target.value])}>
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
        <button className="button cursor__not-allowed" type="submit" disabled={notCorrect}>Opublikuj</button>
        {payloadTooLarge ? <p className='error'>Post zajmuje zbyt dużą ilość pamięci!</p> : null}
      </form>
    )}
    </div>
  )
}
