import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { BiSolidUser } from "react-icons/bi"

const User = ({ open }) => {

    const [formData, setFormData] = useState({ id: "", name: "", email: "" })
    const { id, name, email } = formData

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {

        const data = await fetch("http://localhost:5000/api/user/login", {
            method: "GET",
            headers: {
                "auth-token": localStorage.getItem("token")
            }
        })

        const {user} = await data.json()
        setFormData({ id: user._id, name: user.name, email: user.email })
        // console.log(user)
    }

    useEffect(() => {
        handleSubmit()
    }, [])


    return (
        <div>

            <button type="button" ref={open} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#modal">
                Launch demo modal
            </button>


            <div className="modal fade" id="modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel"><BiSolidUser />User Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            {localStorage.getItem("token") ? <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label style={{ fontSize: "2.5rem", fontWeight: 500 }} htmlFor='id'>User Id</label>
                                    <input style={{ padding: 15, borderBottom: "2px solid black", borderRight: "transparent", borderLeft: "transparent", borderTop: "transparent", fontSize: "2rem" }} type="text" className="form-control" id="id" value={id} onChange={handleChange} aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label style={{ fontSize: "2.5rem", fontWeight: 500 }} htmlFor='name'>User Name</label>
                                    <input style={{ padding: 15, borderBottom: "2px solid black", borderRight: "transparent", borderLeft: "transparent", borderTop: "transparent", fontSize: "2rem" }} type="text" className="form-control box" id="name" value={name} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label style={{ fontSize: "2.5rem", fontWeight: 500 }} htmlFor='email'>User Email</label>
                                    <input style={{ padding: 15, borderBottom: "2px solid black", borderRight: "transparent", borderLeft: "transparent", borderTop: "transparent", fontSize: "2rem" }} type="text" className="form-control box" id="email" value={email} onChange={handleChange} />
                                </div>
                            </form> : <h2 style={{ fontSize: '1.5rem', fontWeight: "bolder", color: "red", textAlign: "center" }}> Login first to Know the details </h2>}

                        </div>
                        {localStorage.getItem("token") ? <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <Link to="/posts" type="button" className="btn btn-primary">Posts</Link>
                        </div> : <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User