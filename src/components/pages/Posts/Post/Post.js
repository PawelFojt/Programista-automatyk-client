import React from 'react';
import styles from './Post.module.css';
import {Link} from 'react-router-dom';

export default function Post(props) {
  const PF = "http://localhost:5000/images/" || "https://programista-automatyk-api.herokuapp.com/images";
  return (
    <div className={styles.post}>
      {props.post.photo && (
      <img 
        className={styles.img}
        src={PF + props.post.photo}
        alt=""
      />
      )}
      <div className={styles.info}>
        <div className={styles.categories}>
          {props.post.categories.map(c => (
            <span className={styles.category}>{c.name}</span>
          ))}
        </div>
        <Link to={`/post/${props.post._id}`} className={styles.link}>
          <span className={styles.title}>
            {props.post.title}
          </span>
        </Link>
        <hr/>
        <span className={styles.date}>{new Date (props.post.createdAt).toDateString()}</span>
      </div>
      <p className={styles.desc}>{props.post.desc}</p>
    </div>
  )
}
