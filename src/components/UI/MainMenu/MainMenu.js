import React from 'react'
import styles from './MainMenu.module.css';
import {Link} from 'react-router-dom';

export default function MainMenu() {
  const user = false;
  return (
    <div className={styles.mainMenu}>
        <ul className={styles.list}>
          <Link to="/" className={styles.item}>STRONA GŁÓWNA</Link >
          <Link to="/posts" className={styles.item}>BAZA WIEDZY</Link >
          <Link to="/post" className={styles.item}>KONTAKT</Link >
          <Link to="/newpost" className={styles.item}>NOWY WPIS</Link >
          <Link to="/login" className={styles.item}>{user ? "WYLOGUJ" : "ZALOGUJ"}</Link >
        </ul>
      </div>
  )
}
