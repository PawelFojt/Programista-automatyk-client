import axios from 'axios';
import { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../../../context/Context';
import styles from './Login.module.css';

export default function Login() {

  const userRef = useRef();
  const passwordRef = useRef();
  const {dispatch, isFetching, error} = useContext(Context);
  
  
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
      <form className={styles.form} onSubmit={handleSubmit} >
        <label>Nazwa użytkownika</label>
        <input 
          type='text' 
          name='username'
          placeholder='wpisz nazwę użytkownika' 
          ref={userRef}
        />
        <label>Hasło</label>
        <input 
          type='password' 
          name='current-password'
          placeholder='wpisz hasło' 
          ref={passwordRef}
        />
        <button 
          className="button cursor__wait"
          type="submit"
          disabled={isFetching}
        >
          Zaloguj
        </button>
        {error && (<p className={styles.error}>Nieprawidłowe hasło lub użytkownik nie istnieje</p>)}
      </form>
      <label htmlFor='register'>Nie masz konta? Zarejestruj się!</label>
      <Link to="../register" >
        <button id='register' className="button">Rejestracja</button>
      </Link>
    </div>
  )
}
