import React, { useContext } from 'react'
import styles from './MainMenu.module.css';
import {Link} from 'react-router-dom';
import { Context } from '../../../context/Context';

export default function MainMenu({menuButton, onClick}) {
  const {user, dispatch} = useContext(Context);
  const handleLogout = () => {
    dispatch({type:"LOGOUT"})
  }
  return (
    <div onClick={() => {onClick()}} className={`${styles.mainMenu} ${menuButton && styles.menuButton}`}>
        <ul className={styles.list}>
          <Link to="/" className={styles.item}>STRONA GŁÓWNA</Link >
          <Link to="/posts" className={styles.item}>BAZA WIEDZY</Link >
          <Link to="/contact" className={styles.item}>KONTAKT</Link >
          <Link to="/newpost" className={styles.item}>NOWY WPIS</Link >
          <Link to="/login" className={styles.item} onClick={handleLogout}>{user ? "WYLOGUJ" : "ZALOGUJ"}</Link >
        </ul>
      </div>
  )
}
