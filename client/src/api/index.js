import axios from "axios"

const url = 'http://localhost:3011/posts'

export const fetchPosts = axios.get(url)