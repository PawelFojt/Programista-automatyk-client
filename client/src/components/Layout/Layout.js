import React from 'react'
import styles from './Layout.module.css'

export default function Layout(props) {
  return (
    <div className={styles.layout}>
        {props.topBar}
      <div className={styles.container}>
        <div className={styles.blank}></div>
        <main className={styles.content}>{props.content}</main>
        <aside className={styles.sideBar}>{props.sideBar}</aside>
      </div>
      <div>
        {props.footer}
      </div>
    </div>
  )
}
