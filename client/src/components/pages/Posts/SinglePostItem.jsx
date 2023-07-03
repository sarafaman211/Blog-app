import React from 'react'
import Moment from "moment"
//  for like post use context to get the apis

const SinglePostItem = ({ blog }) => {
    const { title, description, image, likes, comments, date, _id } = blog

    return (
        <div className="card mb-3 container">
            <img src={image ? image : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png"} style={{ width: "50%", marginLeft: "30rem" }} className="card-img-top" alt="..." />
            <div className="card-body text-center">
                <h5 className="card-title fs-1">{title}</h5>
                <p className="card-text fs-2">{description}</p>
                <p className="card-text fs-3"><small className="text-body-secondary">Posted On {Moment(date).format('YYYY/MM/DD')}</small></p>
            </div>
        </div>
    )
}

export default SinglePostItem