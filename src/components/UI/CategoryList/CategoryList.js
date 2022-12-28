import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../../../api';
import styles from './CategoryList.module.css';

export default function SideBar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await getCategories();
      setCats(res.data)
    }
    getCats();
  }, [])
  return (
    <>
      <ul className={styles.catList}>
        {cats?.map((c) => (
          <Link key={c._id} to={`/posts/?cat=${c.name}`} className={styles.link}>
            <li className={styles.item} >{c.name}</li>
          </Link>
        ))}
      </ul>
    </>
  );
}
