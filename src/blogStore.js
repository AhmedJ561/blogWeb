// blogStore.js — DEPRECATED
// This file is no longer used. All data operations now go through src/api.js
// which communicates with the Express + MongoDB backend at http://localhost:5000
//
// The API service (api.js) exposes:
//   getBlogs()             → GET  /api/blogs
//   getBlogById(id)        → GET  /api/blogs/:id
//   createBlog(data,token) → POST /api/blogs        (requires JWT)
//   deleteBlog(id,token)   → DEL  /api/blogs/:id    (requires JWT)
//   loginUser(creds)       → POST /api/auth/login
//   registerUser(creds)    → POST /api/auth/register
