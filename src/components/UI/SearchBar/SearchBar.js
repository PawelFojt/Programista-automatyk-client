import React from 'react';
import styles from './SearchBar.module.css';

export default function SearchBar() {
  
  return (
    <div className={styles.searchBar}>
        
        <i className={`${styles.icon} fa-solid fa-magnifying-glass`}></i>
        
      </div>
  )
}
