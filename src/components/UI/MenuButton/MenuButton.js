import React from "react";
import styles from "./MenuButton.module.css";

export default function MenuButton({ onClick }) {
    return (
        <>
            <button
                className={styles.menuButton}
                onClick={() => {
                    onClick();
                }}
            >
                <i className="fa-solid fa-bars"></i>
            </button>
        </>
    );
}
