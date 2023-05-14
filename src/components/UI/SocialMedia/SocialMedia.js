import React from "react";
import styles from "./SocialMedia.module.css";

export default function SocialMedia({ color }) {
    return (
        <div className={styles.socialMedia}>
            <a
                href="https://www.facebook.com/pwfojt"
                className={`${styles.icon} ${styles[color]}`}
            >
                <i className="fa-brands fa-square-facebook"></i>
            </a>
            <a
                href="https://twitter.com/PawelFojt"
                className={`${styles.icon} ${styles[color]}`}
            >
                <i className="fa-brands fa-square-twitter"></i>
            </a>
            <a
                href="https://github.com/PawelFojt"
                className={`${styles.icon} ${styles[color]}`}
            >
                <i className="fa-brands fa-square-github"></i>
            </a>
            <a
                href="https://www.instagram.com/pawelfojt/"
                className={`${styles.icon} ${styles[color]}`}
            >
                <i className="fa-brands fa-square-instagram"></i>
            </a>
        </div>
    );
}
