import { useState, useEffect } from "react";
import { getCategories } from "../api";

export function useCategoryList() {
    const [cats, setCats] = useState([]);

    useEffect(() => {
        const getCats = async () => {
            const res = await getCategories();
            setCats(res.data);
        };
        getCats();
    }, []);

    return { cats };
}
