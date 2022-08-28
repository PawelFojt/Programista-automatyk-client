import React from 'react';
import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={styles.home}>
        <h1>Automatyczny blog</h1>
        <div className={styles.container}>
          <div className = {styles.item}>
            <i className={`${styles.icon} fa-solid fa-book-open`}></i>
            <p>Stwórz swoją własną bazę wiedzy!</p>
          </div>
          <div className = {styles.item}>
            <i className={`${styles.icon} fa-solid fa-book`}></i>
            <p>Dodawaj dokumenty, instrukcje, instruktaże!</p>
          </div>     
          <div className = {styles.item}>
            <i className={`${styles.icon} fa-solid fa-bookmark`}></i>
            <p>Strona powstała z myślą dostępu do wiedzy w jednym miejscu z zakresu elektryki, automatyki, pneumatyki i hydrauliki. </p>
          </div>     
           
        </div>
    </div>
    
  );
}
