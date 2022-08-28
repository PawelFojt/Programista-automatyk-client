import React from 'react';
import styles from './Settings.module.css';
import profileImg from '../../../../assets/profileImg.jpg';

export default function Settings() {
  return (
    <div className={styles.settings}>
      <div className={styles.title}>
        <span className={styles.updateTitle}>
          Uaktualnij swoje konto
        </span>
        <span className={styles.deleteTitle}>
          Usuń konto
        </span>
      </div>
        <form className={styles.form}>
          <label>Zdjęcie profilowe</label>
          <div className={styles.img}>
            <img
              src={profileImg}
              alt="zdjęcie profilowe"
            />
            <label htmlFor="fileInput">
              <i class={`${styles.userIcon} fa-solid fa-user`}></i>
            </label>
            <input type="file" id="fileInput" style={{display:"none"}}/>
          </div>
          <label>Nazwa użytkownika</label>
          <input type="text" placeholder="Nazwa użytkownika"/>
          <label>Adres e-mail</label>
          <input type="email" placeholder="Adres e-mail"/>
          <label>Hasło</label>
          <input type="password" placeholder="Hasło"/>
          <button className={styles.button}>Aktualizuj</button>
        </form>
    </div>
  )
}
