import { useState, useEffect } from "react";
import { getPosts } from "../api";

export function usePosts(search, searchByTitle) {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const fetchPosts = async () => {
            const res = await getPosts(search);
            let posts = res.data;
            if (searchByTitle) {
                posts = res.data.filter((post) =>
                    post.title
                        .toLowerCase()
                        .includes(searchByTitle.toLowerCase())
                );
            }
            setPosts(posts);
            setIsLoading(false);
        };
        fetchPosts();
    }, [search, searchByTitle]);

    return { posts, isLoading };
}
