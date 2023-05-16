import React from "react";
import styles from "./Contact.module.css";

export default function Contact() {
    return (
        <div className={styles.contact}>
            <h1>Kontakt</h1>
            <div className={styles.box}>
                <i className="fa-solid fa-envelope"></i>
                <p className={styles.info}>Email: pwfojt@gmail.com</p>
            </div>
            <div className={styles.box}>
                <i className="fa-solid fa-square-phone"></i>
                <p className={styles.info}>Telefon: 794 367 015</p>
            </div>
        </div>
    );
}
