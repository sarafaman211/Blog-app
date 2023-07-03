import React, { useContext, useState } from 'react'
import blogContext from '../../Context/blogContext'
import CommentItem from './CommentItem'
import toast, { Toaster } from "react-hot-toast"

const CommentForm = ({ blog }) => {
    const [description, setDescription] = useState("")
    const { addComment } = useContext(blogContext)
    const { _id, comments } = blog

    console.log(comments)

    const handleChange = (e) => {
        setDescription(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        addComment(_id, { description: description })
        setDescription("")
        toast.success("Commented Added !!!", {
            position: "bottom-center"
        })
    }
    return (
        <>
            <div className='container' style={{ margin: "8rem" }}>
                <h3 className='p-3'>Leave Comment ..</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <textarea style={{ border: '2px solid black', padding: "1.5rem", borderRadius: "10px", fontSize: "1.5rem" }} name="description" id="description" cols="50" rows="4" placeholder='Leave a comment....' onChange={handleChange} value={description} />
                    </div>
                    <button type='submit' className='btn btn-primary'>Submit</button>
                </form>

                <div className='pt-5'>
                    {comments && comments.map(comment => {
                        return <CommentItem key={comment._id} comment={comment} blog={blog} />
                    })}
                </div>
            </div>

            <div style={{ fontSize: "1.5rem" }}><Toaster /></div>
        </>
    )
}

export default CommentForm