import React, { useState } from 'react';
import styles from './SearchBar.module.css';

export default function SearchBar() {
  const [expand, setExpand] = useState(false);
  const expandHandler = () => {
    setExpand(!expand);
  };
  return (
    <div className={styles.searchBar}>
      <i className={`${styles.icon} fa-solid fa-magnifying-glass`} onClick={() => {expandHandler()}}></i>
      <input className={`${styles.input} ${expand && styles.expand}`}></input> 
    </div>
  )
}
