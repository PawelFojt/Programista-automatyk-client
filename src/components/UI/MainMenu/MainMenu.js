import React, { useContext } from 'react'
import styles from './MainMenu.module.css';
import {Link} from 'react-router-dom';
import { Context } from '../../../context/Context';

export default function MainMenu() {
  const {user, dispatch} = useContext(Context);
  const handleLogout = () => {
    dispatch({type:"LOGOUT"})
  }
  return (
    <div className={styles.mainMenu}>
        <ul className={styles.list}>
          <Link to="/" className={styles.item}>STRONA GŁÓWNA</Link >
          <Link to="/posts" className={styles.item}>BAZA WIEDZY</Link >
          <Link to="/post" className={styles.item}>KONTAKT</Link >
          <Link to="/newpost" className={styles.item}>NOWY WPIS</Link >
          <Link to="/login" className={styles.item} onClick={handleLogout}>{user ? "WYLOGUJ" : "ZALOGUJ"}</Link >
        </ul>
      </div>
  )
}
