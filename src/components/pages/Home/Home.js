import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

export default function Home() {
    return (
        <>
            <h1 className={styles.header}>Automatyczny blog</h1>
            <div className={styles.container}>
                
                <Link to="/posts" className={styles.item}>
                    <i className={`${styles.icon} fa-solid fa-book-open`}></i>
                    <p>Głodny wiedzy? Sprawdź mojego bloga!</p>
                </Link>

                <Link to="/newPost" className={styles.item}>
                    <i className={`${styles.icon} fa-solid fa-book`}></i>
                    <p>Podziel się swoją wiedzą dodając nowy wpis!</p>
                </Link>

            </div>
        </>
    );
}
