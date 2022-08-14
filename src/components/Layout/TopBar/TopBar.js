import React from 'react';
import styles from './TopBar.module.css';
import MainMenu from '../../UI/MainMenu/MainMenu';
import SearchBar from '../../UI/SearchBar/SearchBar';
import SocialMedia from '../../UI/SocialMedia/SocialMedia';
import Header from '../../UI/Header/Header';

export default function TopBar(props) {
  return (
    <>
      <div className={styles.topBar}>
        <div className={styles.main}>
          <button className={styles.mode} onClick={() => {props.onSwitch()}}>
            {props.mode === "dark-mode"? <i className="fa-solid fa-sun"></i> : <i className="fa-solid fa-moon"></i> }
          </button>
          <SocialMedia />
          <Header
            title = "Programista-Automatyk" />
          <SearchBar />
        </div>
        <nav className={styles.nav}>
          <MainMenu />
        </nav>
      </div>
    </>
  );
}