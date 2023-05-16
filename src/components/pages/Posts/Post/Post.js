import React from "react";
import styles from "./Post.module.css";
import { Link } from "react-router-dom";
import { urlImg } from "../../../../api";

export default function Post({ post }) {
    let bgImgStyle = {}
    if(post.photo) 
        bgImgStyle = {
            backgroundImage: `url(${urlImg}${post.photo})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundBlendMode: "overlay"
        }
    return (
        <Link to={`/post/${post._id}`} className={styles.postLink} style={bgImgStyle}>
            <article className={styles.post} >
                <div className={styles.info}>
                    <div className={styles.categories}>
                        {post?.categories &&
                            post.categories.map((c) => (
                                <span
                                    key={post._id}
                                    className={styles.category}
                                >
                                    <i>{c}</i>
                                </span>
                            ))}
                    </div>
                    <span className={styles.title}>{post.title}</span>
                    <span className={styles.date}>
                        {new Date(post.createdAt).toDateString()}
                    </span>
                </div>
            </article>
        </Link>
    );
}
