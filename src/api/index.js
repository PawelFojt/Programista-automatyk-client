import axios from "axios";

export const urlImg = "https://storage.googleapis.com/programista-automatyk/";
const API = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
});
// const API = axios.create({ baseURL: 'https://programista-automatyk-server.herokuapp.com' });


// post API
export const singlePost = (path) => API.get(`/posts/${path}`);
export const deletePost = (path, token) =>
    API.delete(`/posts/${path}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
export const updatePostPhoto = (data, token) =>
    API.post("/upload", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
export const updatePost = (path, updatedPost, token) =>
    API.patch(`/posts/${path}`, updatedPost, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
export const getPosts = (search) => API.get(`/posts/${search}`);

// user API
export const loginUser = (userInfo) => API.post("/auth/login", userInfo);
export const registerUser = (userInfo) => API.post("/auth/register", userInfo);
export const getToken = () => API.get("/auth/token");
export const logoutUser = () => API.delete("/auth/logout");
export const updateUserPhoto = (data, token) =>
    API.post("/upload", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
export const updateUser = (id, updatedUser, token) =>
    API.put(`/user/${id}`, updatedUser, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
export const deleteUser = (id, token) =>
    API.delete(`/user/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

// new post API
export const getCategories = () => API.get("/categories");
export const createPostPhoto = (data, token) =>
    API.post("/upload", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
export const createNewPost = (newPost, token) =>
    API.post("/posts", newPost, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
