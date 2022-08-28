import React from 'react'
import styles from './NewPost.module.css';

export default function NewPost() {
  return (
    <div className={styles.newPost}>
      <img 
        className={styles.img}
        src="https://images.pexels.com/photos/7285971/pexels-photo-7285971.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="blog"
      />
      <form className={styles.form}>
        <div className={styles.container}>
          <label htmlFor="fileInput">
            <i className={`${styles.icon} fa-solid fa-plus`}/>
            
          </label>
          <input 
            style={{display:"none"}}
            type="file" 
            id="fileInput"/>
          <input 
            className={styles.title}
            type="text" 
            placeholder="Tytuł"
            id="titleInput" 
            autoFocus={true}/>
        </div>
        <div className={styles.container}>
          <textarea 
            placeholder="Napisz coś..."
            type="text"
            className={styles.desc}
          />
        </div>
        <button className={styles.submitButton}>Opublikuj</button>
      </form>
    </div>
  )
}
