import React, { useContext } from 'react'
import { Toaster } from "react-hot-toast"
import PostItems from '../Posts/PostItems'
import blogContext from '../../../Context/blogContext'
import {LiaBlogSolid} from "react-icons/lia"
 

const Home = () => {

  const { blogData } = useContext(blogContext)
  
  return (
    <>
      <div style={{ fontSize: "1.5rem" }}><Toaster /></div>

      <div className='container fs-2' style={{ marginTop: "8rem", textAlign: "center", padding: "1.5rem", textTransform: "uppercase", fontWeight: "bolder" }}><LiaBlogSolid style={{ fontSize: "4rem", margin: "1rem",  }}/>BLogs</div>
      <div className='container'>
        <div className=" row bg-white p-1 my-1">
          {blogData && blogData.map( data => {
            return  <PostItems key={data._id} blogs={ data } />
          } ) }
        </div>
      </div>
    </>
  )
}

export default Home