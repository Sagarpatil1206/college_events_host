import axios from 'axios'

// const url = 'http://localhost:5000'

export const fetchPosts = (page) => axios.get(`/posts?page=${page}`);
export const fetchPost = (id) => axios.get(`/posts/${id}`)
export const createPost = (newPost) => axios.post(`/posts`,newPost);
export const likePost = (id) => axios.patch(`/posts/${id}/likePost`);
export const addComment = (finalComment,id) => axios.post(`/posts/${id}/addComment`,{finalComment})
export const deletePost = (id) => axios.delete(`/posts/${id}`);
export const updatePost = (id,updatedPost) => axios.patch(`/posts/${id}`,updatedPost)

export const fetchPostsBySearch = (searchQuery) => axios.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
//we have sent the searchqueery containing the search keyword and tags