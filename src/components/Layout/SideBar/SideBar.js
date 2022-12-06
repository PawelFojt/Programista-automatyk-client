import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './SideBar.module.css';

export default function SideBar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories")
      setCats(res.data)
    }
    getCats();
  }, [])
  return (
    <aside className={styles.sideBar}>
      <h2>Kategorie:</h2>
      <ul className={styles.catList}>
        {Array.isArray(cats) && cats.map((c) => (
          <Link key={c._id} to={`/posts/?cat=${c.name}`} className={styles.link}>
            <li className={styles.item} >{c.name}</li>
          </Link>
        ))}
      </ul>
    </aside>
  );
}
