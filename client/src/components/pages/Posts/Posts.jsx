import React, { useContext, useState } from 'react'
import { MdOutlinePostAdd } from "react-icons/md"
import DragAndDrop from "../../layout/DragAndDrop"
import toast, { Toaster } from "react-hot-toast"
import blogContext from '../../../Context/blogContext'
import axios from "axios"

const Posts = () => {

  const [data, setData] =useState({ title: "", description: ""})
  const [selectedImage, setSelectedImage] = useState();
  const { title, description } = data
  // console.log(title, description, imageUrl)

  const { addBlogs } = useContext(blogContext)


  const handleChange = (e) =>{
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    addBlogs({ title: title, description: description })
    toast.success("Data added Successfully !!!!")
    setData({ title: "", description: "", imageUrl: "" })
    
  }


  return (
    <>

      <div className='container' style={{ width: "50%" ,display: "flex", justifyContent: "center", alignItems: "center"}}>
      
        <div className="container" style={{ backgorund: "grey" }}>
      <div className='container fs-2 ' style={{ marginTop: "8rem", textAlign: "center", marginBottom: "2rem" }}><MdOutlinePostAdd style={{ margin: "0 1rem", fontSize: "3rem" }} />Add Posts</div>


          <form style={{ fontSize: '1.5rem' }} onSubmit={handleSubmit} encType='multipart/form-data'>
            
            <div className="mb-3">
              <label style={{ padding: 5, color: "#333", fontWeight: "500" }} htmlFor="to">Title</label>
              <input style={{ border: "2px solid #333", fontSize: "1.5rem" }} type="text"className="form-control box p-3" id="title" name="title" value={title} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label style={{ padding: 5, color: "#333", fontWeight: "500"}} htmlFor="cc">Description</label>
              <input style={{ border: "2px solid #333", fontSize: "1.5rem"  }} type="text" className="form-control box p-3" id="description" name="description" value={description} onChange={handleChange} />
            </div>
            <div className="mb-3 p-3">
              <DragAndDrop value={selectedImage} handleImageChange={handleImageChange} />
            </div>
            <button className='btn btn-primary'>Add Post</button>
          </form>
        </div>
      </div>
      <div style={{ fontSize: "1.5rem" }}><Toaster /></div>
    </>
  )
  }

export default Posts