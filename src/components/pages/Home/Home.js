import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

export default function Home() {
    return (
        <>
            <h1 className={styles.header}>Automatyczny blog</h1>
            <div className={styles.container}>
                <div className={styles.item}>
                    <Link to="/posts">
                        <i
                            className={`${styles.icon} fa-solid fa-book-open`}
                        ></i>
                    </Link>
                    <p>
                        Sprawdz dawkę wiedzy którą dla Ciebie przygotowaliśmy!
                    </p>
                </div>
                <div className={styles.item}>
                    <Link to="/newPost">
                        <i className={`${styles.icon} fa-solid fa-book`}></i>
                    </Link>
                    <p>Podziel się swoją wiedzą dodając nowy wpis!</p>
                </div>
            </div>
        </>
    );
}
