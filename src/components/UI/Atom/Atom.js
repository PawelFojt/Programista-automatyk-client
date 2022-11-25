import React from 'react';
import styles from './Atom.module.css';

export default function Atom({border}) {
  return (
    <div className={styles.atom}>
      <div className={`${styles.ring1} ${styles[border]}`}></div>
      <div className={`${styles.ring2} ${styles[border]}`}></div>
      <div className={`${styles.ring3} ${styles[border]}`}></div>
      <div className={`${styles.ring4} ${styles[border]}`}></div>
      <div className={styles.dot1}></div>
      <div className={styles.dot2}></div>
      <div className={styles.dot3}></div>
      <div className={styles.dot4}></div>
      <div className={styles.center}></div>
    </div>
  );
}
