import React from 'react'
import styles from './Layout.module.css'

export default function Layout(props) {
  return (
    <div className={styles.layout}>
        {props.topBar}
      <div className={styles.container}>
        <main className={styles.content}>{props.content}</main>
      </div>
      <div>
        {props.footer}
      </div>
    </div>
  )
}
