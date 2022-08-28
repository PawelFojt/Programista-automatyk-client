import React from 'react';
import styles from './SocialMedia.module.css';
import Atom from '../Atom/Atom';

export default function SocialMedia() {
  return (
    <div className={styles.socialMedia}>
      <div className={styles.atom}><Atom border="small" /></div>
      <i className={`${styles.icon} fa-brands fa-square-facebook`}></i>
      <i className={`${styles.icon} fa-brands fa-square-twitter`}></i>
      <i className={`${styles.icon} fa-brands fa-square-pinterest`}></i>
      <i className={`${styles.icon} fa-brands fa-square-instagram`}></i>
    </div>
  )
}
