import React, { useEffect, useState } from 'react'
import BlogContext from "./blogContext"

const BlogState = ({ children, match }) => {

  const [dashData, setDashData] = useState([])
  const [blogData, setBlogData] = useState([])
  const [singleBlog, setSingleBlog] = useState([])
  const [comment, setComment] = useState([])

  // Dashboard functions and request
  const dashBoard = async () => {
    const data = await fetch("http://localhost:5000/api/user/userInfo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
    })

    const res = await data.json()
    // console.log(res)
    setDashData(res)
  }

  const deleteUser = async (id) => {
    await fetch(`http://localhost:5000/api/user/deleteUser/${id}`, {
      method: "DELETE",
      headers: {
        "content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
    })

    const deleteData = dashData.filter(data => { return data._id !== id })
    setDashData(deleteData)
  }

  //  Blogs related request
  // all blogs
  const posts = async () => {
    const data = await fetch("http://localhost:5000/api/post/allBlogs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })

    const { blogs } = await data.json()
    setBlogData(blogs)
  }

  // fetch the simgle blog 
  const blogView = async (id) => {
    const data = await fetch(`http://localhost:5000/api/post/Blogs/${ id }`, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
    })

    const { blog } = await data.json()
    console.log(blog)
    setSingleBlog(blog)
  }


  // like and unlike the post from the blog
  const likePost = async (id) => {
    const data = await fetch(`http://localhost:5000/api/post/like/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
    })

    const res = await data.json()
    console.log(res)
  }

  const unLikePost = async (id) => {
    await fetch(`http://localhost:5000/api/post/unLike/${id}`, {
      method: "PUT",
      headers: {
        "content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
    })
  }

  // add comment and remove the comment from the blog
  const addComment = async (_id, description) => {
    const data = await fetch(`http://localhost:5000/api/post/comment/${_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify(description)
    })

    const res = await data.json()
    console.log(res)
  }

  const deleteComment = async (id, commentId) => {
    await fetch(`http://localhost:5000/api/post/deleteComment/${id}/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
    })
    const deleteComment = comment.filter(data => { return data._id !== id })
    setComment(deleteComment)
  }

  // add BLogs
  const addBlogs = async (title, description)=>{
    const data = await fetch("http://localhost:5000/api/post/addBlogs",{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify(title, description)
    })

    const res = await data.json()
    console.log(res)
  }

  useEffect(() => {
    dashBoard()
    posts()
  }, [])


  return (
    <BlogContext.Provider value={{ dashBoard, dashData, deleteUser, blogData, likePost, unLikePost, addComment, deleteComment, singleBlog, blogView, addBlogs }}>
      {children}
    </BlogContext.Provider>
  )
}

export default BlogState