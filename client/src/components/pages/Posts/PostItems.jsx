import React, { useContext, useState } from 'react'
import { Link } from "react-router-dom"
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi"
import Moment from "moment"
import blogContext from '../../../Context/blogContext'
import toast, {Toaster} from "react-hot-toast"


const PostItems = ({ blogs }) => {

    const { title, description, image, likes, comments, date, _id } = blogs
    const { likePost, unLikePost, deleteBlogs } = useContext(blogContext)

    const handleLike = (e) => {
        e.preventDefault()
        likePost(_id)
    }
    
    const deleteBlog = () => {
        deleteBlogs(_id)
        toast.success("Post Deleted !!!")
    }
    
    return (
        <>
            <div className='col-md-6 g-4' >
        <div style={{ fontSize: "1.5rem" }}><Toaster /></div>
                <div className='card' style={{ width: "50rem", padding: "2rem" }}>
                    <Link to={`/singlePost/${_id}`}>
                        <div style={{ textAlign: 'center' }}>
                            <img src={image ? image : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png"} className="img-fluid rounded-start" alt="..." />
                        </div>
                        <h4 style={{ padding: "1.5rem 0", textAlign: "center" }}>{title}</h4>
                    </Link>
                    <div>
                        <p className="my-1 description fs-4 text-center">
                            {description}
                        </p>
                        <p className="post-date p-4 fs-5 text-center">Posted on {Moment(date).format('YYYY/MM/DD')}</p>

                        <div className="d-felx text-center">
                            <button onClick={handleLike} type='button' className='btn btn-light'>
                                <FiThumbsUp style={{ fontSize: '1.8rem' }} />
                                {likes.length > 0 && (
                                    <span className='p-3' style={{ textAlign: "center", fontSize: "1.2rem", paddingTop: "5px" }}>{likes.length}</span>
                                )}
                            </button>
                            <button onClick={(e) => unLikePost(_id)} type='button' className='btn btn-light'>
                                <FiThumbsDown style={{ fontSize: '1.8rem' }} />
                            </button>
                            <Link to={`/singlePost/${_id}`} className='btn btn-primary'>
                                Discussion {comments.length > 0 && (
                                    <span className='comment-count'>{comments.length}</span>
                                )}
                            </Link>
                            {localStorage.getItem("token")?<button type='submit' onClick={deleteBlog} className='btn btn-primary'>Delete</button> : null}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default PostItems