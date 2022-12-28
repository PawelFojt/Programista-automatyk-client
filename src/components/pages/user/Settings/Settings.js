import React, { useContext, useState } from 'react';
import { deleteUser, updateUser, updateUserPhoto } from '../../../../api';
import { Context } from '../../../../context/Context';
import PasswordAndConfirmPasswordValidation from '../Register/Password/PasswordAndConfirmPasswordValidation';
import styles from './Settings.module.css';
import { v4 as uuid } from 'uuid';

export default function Settings() {
  const {user, dispatch} = useContext(Context);
  const [file, setFile] = useState(null);
  const [passwordInput, setPasswordInput]= useState({
    password:'',
    confirmPassword:''
})

  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(null);
  const PF = "https://programista-automatyk-server.herokuapp.com/images/";

  const handlePasswordChange =(e)=>{
    const passwordInputValue = e.target.value.trim();
    const passwordInputFieldName = e.target.name;
    const NewPasswordInput = {...passwordInput,[passwordInputFieldName]:passwordInputValue};
    setPasswordInput(NewPasswordInput);
    setPassword(NewPasswordInput.password);
}
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    dispatch({type:"UPDATE_START"});
    const updatedUser = {
      userId: user._id,
      username: user.username,
      email: user.email,
      password
    };
    if(file) {
      const data = new FormData();
      const filename = `${uuid()}-${file.name}`;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await updateUserPhoto(data);
      } catch(err) {
        console.log(err);
      }
    }
    try {
      const res = await updateUser(user._id, updatedUser);
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
      await deleteUser(user._id);
      dispatch({type: "LOGOUT"});
      window.location.replace("/");
    } catch(err) {
      console.log(err);
    }
  };


  return (
    <div className={styles.container}>
      <div className={styles.settings}>
        <div className={styles.title}>
          <span className={styles.updateTitle}>
            Uaktualnij swoje konto
          </span>
          <span onClick={handleDelete} className={styles.deleteTitle}>
          <i className={`${styles.userIcon} fa-solid fa-trash`}></i>
          </span>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>Zdjęcie profilowe</label>
          <div className={styles.img}>
            {file && (<img
              src={file ? URL.createObjectURL(file) : PF+user.profilePic}
              alt="zdjęcie profilowe"
            />)}
            <label htmlFor="fileInput">
              <i className={`${styles.userIcon} fa-solid fa-user`}></i>
            </label>
            <input 
              style={{display:"none"}}
              type="file" 
              name="file"
              id="fileInput"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <PasswordAndConfirmPasswordValidation
            passwordInput={passwordInput} 
            handlePasswordChange={handlePasswordChange}
            buttonText="Aktualizuj"
            />
          {success ? <span>Zaktualizowano pomyślnie!</span> : null}
        </form>
      </div>
    </div>
  )
}
