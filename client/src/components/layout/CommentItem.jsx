import React, { useContext } from 'react'
import Moment from 'moment'
import blogContext from '../../Context/blogContext'
import toast, { Toaster } from "react-hot-toast"

const CommentItem = ({ comment, blog }) => {

  const { description, date, _id } = comment
  const { deleteComment } = useContext(blogContext)

  console.log(_id)

  const handleClick = (e) => {
    deleteComment(blog._id, _id)
    toast.success("Comment Deleted")
  }

  return (
    <>
      <div className="card mb-3" style={{ maxWidth: "540px" }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img style={{ width: "50%", margin: "1.5rem" }} src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png" className="img-fluid rounded-start" alt="..." />
            <small>user: {_id}</small>
          </div>
          <div className="col-md-8 mt-4">
            <div className="card-body">
              <h5 className="card-title fs-3">Comments</h5>
              <p className="card-text fs-2">{description}</p>
              <p className="card-text fs-4"><small className="text-body-secondary">Posted on {Moment(date).format('YYYY/MM/DD')}</small></p>
              <button onClick={handleClick} className="btn btn-primary">Delete</button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ fontSize: "1.5rem" }}><Toaster /></div>
    </>
  )
}

export default CommentItem