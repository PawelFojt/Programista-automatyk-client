import axios from 'axios';
import { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../../../context/Context';
import styles from './Login.module.css';

export default function Login() {

  const userRef = useRef();
  const passwordRef = useRef();
  const {dispatch, isFetching} = useContext(Context);
  
  
  const handleSubmit = async(e) => {
    e.preventDefault()
    dispatch({type:"LOGIN_START"});
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      })
      dispatch({type:"LOGIN_SUCCESS", payload:res.data});
    } catch(err) {
      dispatch({type:"LOGIN_FAILURE"});
    }
  };

  return (
    <div className={styles.login}>
      <h1 className={styles.header}>Logowanie</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>Nazwa użytkownika</label>
        <input 
          type='text' 
          placeholder='wpisz nazwę użytkownika' 
          ref={userRef}
        />
        <label>Hasło</label>
        <input 
          type='password' 
          placeholder='wpisz hasło' 
          ref={passwordRef}
        />
        <button 
          className={styles.button}
          type="submit"
          disabled={isFetching}
        >
          Zaloguj
        </button>
      </form>
      <label>Nie masz konta? Zarejestruj się!</label>
      <Link to="../register" >
        <button className={styles.button}>Rejestracja</button>
      </Link>
    </div>
  )
}
