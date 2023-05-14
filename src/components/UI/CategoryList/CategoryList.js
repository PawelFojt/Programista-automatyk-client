import React from "react";
import { Link } from "react-router-dom";
import { useCategoryList } from "../../../Hooks/useCategoryList";
import styles from "./CategoryList.module.css";

export default function SideBar() {
    const { cats } = useCategoryList();

    return (
        <ul className={styles.catList}>
            {cats?.map((c) => (
                <Link
                    key={c._id}
                    to={`/posts/?cat=${c.name}`}
                    className={styles.link}
                >
                    <li className={styles.item}>{c.name}</li>
                </Link>
            ))}
        </ul>
    );
}
