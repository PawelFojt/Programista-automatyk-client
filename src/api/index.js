import axios from 'axios';

const url = "https://programista-automatyk-server.herokuapp.com"

//post API
export const singlePost = (path) => axios.get(`${url}/posts/` + path);
export const deletePost = (path, data) => axios.delete(`${url}/posts/` + path, {data: data});
export const updatePostPhoto = (data) => axios.post(`${url}/upload`, data);
export const updatePost = (path, updatedPost) => axios.patch(`${url}/posts/` + path, updatedPost);
export const getPosts = (search) => axios.get(`${url}/posts` + search);

//user API
export const loginUser = (userInfo) => axios.post(`${url}/auth/login`, userInfo);
export const registerUser = (userInfo) => axios.post(`${url}/auth/register`, userInfo);
export const updateUserPhoto = (data) => axios.post(`${url}/upload`, data);
export const updateUser = (id, updatedUser) => axios.put(`${url}/user/` + id, updatedUser);
export const deleteUser = (id) => axios.delete(`${url}/user/` + id);