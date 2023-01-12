import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../../context/Context';
import styles from './NewPost.module.css';
import ReactQuill from 'react-quill';
import EditorToolbar, { modules, formats } from '../../EditorToolbar/EditorToolbar';
import 'react-quill/dist/quill.snow.css';
import { v4 as uuid } from 'uuid';
import { createNewPost, createPostPhoto, getCategories } from '../../../api';

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState(['Automatyka']);
  const { user } = useContext(Context);
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notCorrect, setNotCorrect] = useState(true);
  const [payloadTooLarge, setPayloadTooLarge] = useState(false);

  useEffect(() => {
    const getCats = async () => {
      const res = await getCategories();
      setCats(res.data);
    };
    getCats();
  }, []);

  useEffect(() => {
    title && desc ? setNotCorrect(false) : setNotCorrect(true);
    setPayloadTooLarge(false);
    setLoading(false);
  }, [title, desc]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newPost = {
      username: user.username,
      title,
      desc,
      categories,
    };
    if (file) {
      const data = new FormData();
      const filename = `${uuid()}-${file.name}`;
      data.append('name', filename);
      data.append('file', file);
      newPost.photo = filename;
      try {
        await createPostPhoto(data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await createNewPost(newPost);
      window.location.replace(`/post/${res.data._id}`);
    } catch (err) {
      console.log(err);
      if (err.message === 'Request failed with status code 413') {
        setPayloadTooLarge(true);
      }
    }
  };

  const onDescChange = (value) => {
    setDesc(value);
  };

  const options =
    Array.isArray(cats) &&
    cats.map((c) => ({ label: c.name, value: c.name }));
  
    return (
      <div className={styles.newPost}>
        {loading && !payloadTooLarge ? (
          <div className="loading">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
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
                ) : (
                  <i className={`${styles.icon} fa-solid fa-image`} />
                )}
              </label>
              <input
                style={{ display: "none" }}
                type="file"
                accept="image/png, image/jpeg"
                id="fileInput"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <label htmlFor="catSelect">Wybierz kategorie:</label>
              <select
                name="catSelect"
                className={styles.catSelect}
                onChange={(e) => setCategories([e.target.value])}
              >
                {options?.map((option, index) => (
                  <option
                    className={styles.catOption}
                    key={index}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
              <input
                className={styles.title}
                type="text"
                placeholder="Tytuł"
                id="titleInput"
                required="true"
                autoFocus={true}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className={styles.editor}>
              <EditorToolbar toolbarId={"t1"} />
              <ReactQuill
                theme="snow"
                value={desc}
                onChange={onDescChange}
                placeholder={"Napisz coś..."}
                modules={modules("t1")}
                formats={formats}
              />
            </div>
            <button
              className="button cursor__not-allowed"
              type="submit"
              disabled={notCorrect}
            >
              Opublikuj
            </button>
            {payloadTooLarge && (
              <p className="error">
                Post zajmuje zbyt dużą ilość pamięci! Maksymalnie 16Mb
              </p>
            )}
          </form>
        )}
      </div>
    );    
}
