import React from 'react';
import styles from './Post.module.css';
import {Link} from 'react-router-dom';

export default function Post({post}) {
  const PF ="/images/";
  return (
      <Link to={`/post/${post._id}`} className={styles.post}>
        {post.photo && (
        <img 
          className={styles.img}
          src={PF + post.photo}
          alt=""
        />
        )}
        <div className={styles.info}>
          <div className={styles.categories}>
            {Array.isArray(post.categories) && post.categories.map(c => (
              <span key={post._id} className={styles.category}><i>{c}</i></span>
            ))}
          </div>
            <span className={styles.title}>
              {post.title}
            </span>
          <span className={styles.date}>{new Date (post.createdAt).toDateString()}</span>
        </div>
        <div className={styles.desc} dangerouslySetInnerHTML={{ __html: post.desc}}></div>
      </Link>
  )
}
