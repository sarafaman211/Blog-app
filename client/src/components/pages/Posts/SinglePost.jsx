import React, { useContext, useEffect } from 'react'
import { useParams } from "react-router-dom"
import CommentForm from '../../layout/CommentForm'
import blogContext from '../../../Context/blogContext'
import SinglePostItem from './SinglePostItem'

const SinglePost = () => {

    const { id } = useParams();
    // console.log(id)

    const { blogView, singleBlog } = useContext(blogContext)

    useEffect(() => {
        blogView(id)
    }, [blogView])


    const { _id } = singleBlog

    return (
        <>
            <div style={{ margin: "8rem" }}>
                <SinglePostItem key={_id} blog={singleBlog} />
                <CommentForm key={_id} blog={singleBlog} />
            </div>
        </>
    )
}

export default SinglePost