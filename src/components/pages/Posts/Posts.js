import React from "react";
import styles from "./Posts.module.css";
import Post from "./Post/Post";
import CategoryList from "../../UI/CategoryList/CategoryList";
import { useLocation } from "react-router-dom";
import Loading from "../../UI/Loading/Loading";
import { usePosts } from "../../../Hooks/usePosts";

export default function Posts({ searchByTitle }) {
    const { search } = useLocation();
    const { posts, isLoading } = usePosts(search, searchByTitle);

    return (
        <div className={styles.container}>
            <div className={styles.postContainer}>
                <section className={styles.section}>
                    {isLoading ? (
                        <Loading />
                    ) : (
                        posts.map((post) => <Post key={post._id} post={post} />)
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
