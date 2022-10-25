import React, { useContext, useEffect } from 'react';
import styles from './TopBar.module.css';
import MainMenu from '../../UI/MainMenu/MainMenu';
import SearchBar from '../../UI/SearchBar/SearchBar';
import SocialMedia from '../../UI/SocialMedia/SocialMedia';
import Header from '../../UI/Header/Header';
import { Context } from '../../../context/Context';
import { Link } from 'react-router-dom';

export default function TopBar(props) {
  const {user} = useContext(Context);
  const PF ="/images/";
  
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
          <div className={styles.profileAndSearch}>
            {user && (
              <Link to="/settings">
                {user.profilePic ? (
                  <img 
                  className={styles.img}
                  src={PF+user.profilePic} 
                  alt="profile" />
                ) : (
                  <a href="https://www.instagram.com/pawelfojt/" className={styles.icon}><i className='fa-regular fa-user'></i></a>
                )}
              </Link>
            )}
            <SearchBar />
          </div>
        </div>
        <nav className={styles.nav}>
          <MainMenu />
        </nav>
      </div>
    </>
  );
}