import React from 'react';
import styles from './SearchBar.module.css';
import profileImg from "../../../assets/profileImg.jpg";

export default function SearchBar() {
  return (
    <div className={styles.searchBar}>
        <img 
          className={styles.img}
          src={profileImg} 
          alt="profile" />
        <i className={`${styles.icon} fa-solid fa-magnifying-glass`}></i>
        
      </div>
  )
}
