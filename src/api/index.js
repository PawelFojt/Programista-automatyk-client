import axios from 'axios';

const url = 'https://programista-automatyk-server.herokuapp.com';
// const url = 'http://localhost:5000';
export const urlImg = 'https://programista-automatyk.s3.eu-central-1.amazonaws.com/uploads/';

// post API
export const singlePost = path => axios.get(`${url}/posts/` + path);
export const deletePost = (path, data) => axios.delete(`${url}/posts/` + path, { data });
export const updatePostPhoto = data => axios.post(`${url}/upload`, data);
export const updatePost = (path, updatedPost) => axios.patch(`${url}/posts/` + path, updatedPost);
export const getPosts = search => axios.get(`${url}/posts` + search);

// user API
export const loginUser = userInfo => axios.post(`${url}/auth/login`, userInfo);
export const registerUser = userInfo => axios.post(`${url}/auth/register`, userInfo);
export const updateUserPhoto = data => axios.post(`${url}/upload`, data);
export const updateUser = (id, updatedUser) => axios.put(`${url}/user/` + id, updatedUser);
export const deleteUser = id => axios.delete(`${url}/user/` + id);

// new post API
export const getCategories = () => axios.get(`${url}/categories`);
export const createPostPhoto = data => axios.post(`${url}/upload`, data);
export const createNewPost = newPost => axios.post(`${url}/posts`, newPost);
