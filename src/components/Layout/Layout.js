import React from "react";
import styles from "./Layout.module.css";

export default function Layout({ topBar, content, footer }) {
    return (
        <div className={styles.layout}>
            <header className={styles.topBar}>{topBar}</header>
            <main className={styles.content}>{content}</main>
            <footer className={styles.footer}>{footer}</footer>
        </div>
    );
}
