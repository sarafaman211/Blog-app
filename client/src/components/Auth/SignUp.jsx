import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast"



const SignUp = () => {

    const history = useNavigate()

    const [ formData, setFormData ] = useState({ name: "", email: "", password: "", password2: "" })
    const { name, email, password, password2 } = formData

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name] : e.target.value })
    }

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    } 

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = await fetch("https://blog-app-tp76.onrender.com/api/user/directRegister", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password })
            })
            const res = await data.json()
            console.log(res)
            

        if(!name || !password || !email){
           toast.error("Fill the following fields", {
            position: "bottom-center"
           })
        }
        if(password.length < 4){
            toast.error("Password must be at least 4 characters !!!",{
                position: "bottom-center"
               })
         }
         if(!validateEmail(email)){
            toast.error("Fill the right email address", {
                position: "bottom-center"
               })
         }
        if(password !== password2){
           toast.error("password do not match", {
            position: "bottom-center",
           })
        }
        if(res.success){
            localStorage.setItem("token", res.authToken)
            history("/home")
            toast.success("Register Done",{
                position: "bottom-center",
               } )
        }else{
            toast.error("Register fail ", {
                position: "bottom-center"
            })
        }

    }
  
    return (
        <>
               <div style={{ fontSize: "1.5rem"}}>
                <Toaster />
                </div> 
            <div className="form-container">
                <form onSubmit={handleSubmit} >
                <h3 className="heading">Welcome to <span className="text-primary">SignUp</span></h3>
                    <div className="mb-3">
                        <input type="text" className="form-control box" id="name" aria-describedby="emailHelp" name="name" value={ name } onChange={ handleChange } placeholder='Enter your name'/>
                    </div>
                    <div className="mb-3">
                        <input type="email" className="form-control box" id="email" aria-describedby="emailHelp"  name="email" value={email} onChange={handleChange} placeholder='Enter your email'/>
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control box" id="password"  name="password" value={password} onChange={handleChange} placeholder='Enter your password'/>
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control box" id="password2"  name="password2" value={password2} onChange={handleChange} placeholder='Conform password'/>
                    </div>
                            <div style={{ fontSize: "1.5rem", color: "#333" }} id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    <button style={{ width: "100%" }} type="submit" className="btn">Submit</button>
                    <p>You have an account : <Link to="/login" style={{ textDecoration: "none", color: "#093145" }}>Login</Link></p>
                </form>

            </div>
        </>
    )
}

export default SignUp