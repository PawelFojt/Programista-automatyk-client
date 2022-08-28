import React from 'react';
import styles from './Atom.module.css';
import './border.css';

export default function Atom(props) {
  return (
    <div className={styles.atom}>
      <div className={`${styles.ring1} ${props.border}`}></div>
      <div className={`${styles.ring2} ${props.border}`}></div>
      <div className={`${styles.ring3} ${props.border}`}></div>
      <div className={`${styles.ring4} ${props.border}`}></div>
      <div className={styles.dot1}></div>
      <div className={styles.dot2}></div>
      <div className={styles.dot3}></div>
      <div className={styles.dot4}></div>
      <div className={styles.center}></div>
    </div>
  );
}
