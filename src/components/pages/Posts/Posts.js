import React, { useState, useEffect } from "react";
import styles from "./Posts.module.css";
import Post from "./Post/Post";
import CategoryList from "../../UI/CategoryList/CategoryList";
import { useLocation } from "react-router-dom";
import { getPosts } from "../../../api";
import Loading from "../../UI/Loading/Loading";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await getPosts(search);
      setPosts(res.data);
      setLoading(false);
    };
    fetchPosts();
  }, [search, loading]);

  return (
    <div className={styles.container}>
      <div className={styles.postContainer}>
        <section className={styles.section}>
          {loading ? (
            <Loading />
          ) : (
            posts.map((p) => <Post key={p._id} post={p} />)
          )}
        </section>
      </div>
      <aside className={styles.aside}>
        <h2 className={styles.catHeader}>Kategorie:</h2>
        <CategoryList />
      </aside>
    </div>
  );
}

