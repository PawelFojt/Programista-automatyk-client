import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Context } from '../../../../context/Context';
import styles from './Settings.module.css';

export default function Settings() {
  const {user, dispatch} = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(null);
  const PF = "/images/";
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    dispatch({type:"UPDATE_START"});
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password
    };
    if(file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch(err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.put("/user/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({type:"UPDATE_SUCCESS", payload: res.data})
    } catch (err) {
      console.log(err);
      setSuccess(false);
      dispatch({type:"UPDATE_FAILURE"});
    }
  };

  const handleDelete = async() => {
    try {
      await axios.delete("/user/" + user._id);
      dispatch({type: "LOGOUT"});
      window.location.replace("/");
    } catch(err) {
      console.log(user._id);
      console.log(err);
    }
  };


  return (
    <div className={styles.settings}>
      <div className={styles.title}>
        <span className={styles.updateTitle}>
          Uaktualnij swoje konto
        </span>
        <span onClick={handleDelete} className={styles.deleteTitle}>
          Usuń konto
        </span>
      </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>Zdjęcie profilowe</label>
          <div className={styles.img}>
            <img
              src={file ? URL.createObjectURL(file) : PF+user.profilePic}
              alt="zdjęcie profilowe"
            />
            <label htmlFor="fileInput">
              <i className={`${styles.userIcon} fa-solid fa-user`}></i>
            </label>
            <input 
              style={{display:"none"}}
              type="file" 
              id="fileInput"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Nazwa użytkownika</label>
          <input 
            type="text" 
            placeholder={user.username}
            onChange={e=>setUsername(e.target.value)}
          />
          <label>Adres e-mail</label>
          <input 
            type="email" 
            placeholder={user.email}
            onChange={e=>setEmail(e.target.value)}
          />
          <label>Hasło</label>
          <input 
            type="password"
            onChange={e=>setPassword(e.target.value)}
          />
          <button className={styles.button} type="submit">Aktualizuj</button>
          {success && <span>Zaktualizowano pomyślnie!</span>}
        </form>
    </div>
  )
}
