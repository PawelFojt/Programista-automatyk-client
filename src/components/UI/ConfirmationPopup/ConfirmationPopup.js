import React from "react";
import styles from "./ConfirmationPopup.module.css";

function PopupYesNo({ yes, no, message }) {
    return (
        <div className={styles.popupContainer}>
            <div className={`${styles.popup} ${styles.popupClick}`}>
                <h4>{message}</h4>
                <div className={styles.popupChoice}>
                    <button
                        className={`${styles.yes} ${styles.button}`}
                        onClick={yes}
                    >
                        TAK
                    </button>
                    <button
                        className={`${styles.no} ${styles.button}`}
                        onClick={no}
                    >
                        NIE
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PopupYesNo;
