import React from 'react'
import styles from './MainMenu.module.css';

export default function MainMenu() {
  return (
    <div className={styles.mainMenu}>
        <ul className={styles.list}>
          <li className={styles.item}>STRONA GŁÓWNA</li>
          <li className={styles.item}>BAZA WIEDZY</li>
          <li className={styles.item}>KONTAKT</li>
          <li className={styles.item}>NOWY WPIS</li>
          <li className={styles.item}>WYLOGUJ</li>
        </ul>
      </div>
  )
}
