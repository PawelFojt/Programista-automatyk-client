import React, { useContext } from "react";
import styles from "./MainMenu.module.css";
import { NavLink, Link } from "react-router-dom";
import { Context } from "../../../context/Context";
import { Logout } from "../../../context/Actions";
import { logoutUser } from "../../../api";

export default function MainMenu({ menuButton, onClick }) {
    const { user, dispatch } = useContext(Context);

    const handleLogout = async () => {
        dispatch(Logout());
        try {
            await logoutUser();
        } catch (error) {
            console.error(error);
        }
    };
    const links = [
        { linkTo: "/", text: "STRONA GŁÓWNA" },
        { linkTo: "/posts", text: "BLOG" },
        { linkTo: "/contact", text: "KONTAKT" },
        { linkTo: "/newPost", text: "NOWY WPIS" },
    ];

    return (
        <div
            onClick={() => {
                onClick();
            }}
            className={`${styles.mainMenu} ${
                menuButton ? styles.menuButton : null
            }`}
        >
            <ul className={styles.list}>
                {links.map((element, index) => (
                    <NavLink
                        to={element.linkTo}
                        key={index}
                        className={({ isActive }) => {
                            return isActive
                                ? `${styles.item} ${styles.active}`
                                : styles.item;
                        }}
                    >
                        {element.text}
                    </NavLink>
                ))}
                <Link
                    to="/login"
                    className={styles.item}
                    onClick={handleLogout}
                >
                    {user ? "WYLOGUJ" : "ZALOGUJ"}
                </Link>
            </ul>
        </div>
    );
}
