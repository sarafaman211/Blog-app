import React, { useContext } from 'react'
import { GiPostStamp } from "react-icons/gi"
import blogContext from '../../../Context/blogContext'
import PostItems from './PostItems'

const Allposts = () => {
    const { blogData } = useContext(blogContext)
    return (
        <>
            <div className='container fs-2' style={{ margin: "10rem", textAlign: "center" }}><GiPostStamp style={{ fontSize: "2.5rem", textAlign: "center" }} />All Posts</div>
            <div className='container'>
                <div className=" row bg-white p-1 my-1">
                    {blogData && blogData.map(data => {
                        return <PostItems key={data._id} blogs={data} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Allposts