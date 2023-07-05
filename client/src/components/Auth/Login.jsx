import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import toast, { Toaster } from "react-hot-toast"

const Login = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({ email: "", password: "" })
    const { email, password } = formData

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = await fetch("https://blog-app-tp76.onrender.com/api/user/auth", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })

        const res = await data.json()
        // console.log(res)

        if(!email || !password){
            toast.error("fill the credentials", {
                position: "bottom-center"
            })
        }
        if (password.length < 4) {
            toast.error("password will be of 4 characters", {
                position: "bottom-center"
            })
        } 
        if(res.success){
            localStorage.setItem("token", res.authToken)
            navigate("/home")
            toast.success(`Login done ${ res.email }`,{
                position: "bottom-center"
            })
        }
    }

    return (
        <>
            <div className="form-container">

                <form onSubmit={handleSubmit}>
                    <h3 className="heading">Welcome to <span className="text-primary">LogIn</span></h3>
                    <div className="mb-3">
                        <input type="email" className="form-control box" id="email" aria-describedby="emailHelp" name="email" value={email} onChange={handleChange} placeholder='Enter your email' />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control box" id="password" name="password" value={password} onChange={handleChange} placeholder='Enter your password' />
                    </div>
                    <div style={{ fontSize: "1.5rem", color: "#333" }} id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    <button style={{ width: "100%" }} type="submit" className="btn">Submit</button>
                    <p>Don't have an account? <Link to="/signup" style={{ textDecoration: "none", color: "#093145" }}>SignUp now</Link></p>
                </form>

            </div>

            <div style={{ fontSize: "1.5rem"}}><Toaster /></div>
        </>
    )
}

export default Login