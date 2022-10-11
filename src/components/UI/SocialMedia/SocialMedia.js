import React from 'react';
import styles from './SocialMedia.module.css';
import Atom from '../Atom/Atom';

export default function SocialMedia() {
  return (
    <div className={styles.socialMedia}>
      <div className={styles.atom}><Atom border="small" /></div>
      <a href="https://www.facebook.com/pwfojt" className={styles.icon}><i className='fa-brands fa-square-facebook'></i></a>
      <a href="https://twitter.com/Pawe01951938" className={styles.icon}><i className='fa-brands fa-square-twitter'></i></a>
      <a href="https://github.com/PawelFojt" className={styles.icon}><i className='fa-brands fa-square-github'></i></a>
      <a href="https://www.instagram.com/pawelfojt/" className={styles.icon}><i className='fa-brands fa-square-instagram'></i></a>
    </div>
  )
}
