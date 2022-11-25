import React from 'react';
import SocialMedia from '../../UI/SocialMedia/SocialMedia';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <SocialMedia color="white"/>
    </footer>
  );
}
