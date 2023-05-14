import React from "react";
import styles from "./Header.module.css";

export default function Header(props) {
    return (
        <header className={styles.header}>
            <div className={styles.titles}>
                <span>{props.icon}</span>
                <span className={styles.title}>
                    {props.title.toUpperCase()}
                </span>
                <span>{props.icon}</span>
            </div>
        </header>
    );
}
