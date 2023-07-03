import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBlog } from "react-icons/fa"
import { AiOutlineUser } from "react-icons/ai"
import { CiLogin } from "react-icons/ci"
import { BiLogOut } from "react-icons/bi"
import User from '../Auth/User';

const Navbar = ({ heading, isAuth = false }) => {

    let location = useNavigate();
    let history = useNavigate();

    const logout = () => {
        localStorage.removeItem('token')
        history('/login')
    }

    const ref = useRef(null)

    const updateModal = () => {
        ref.current.click()
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" style={{ fontSize: "2.8rem", color: "yellowgreen", paddingLeft: "1rem" }} to="/"><FaBlog style={{ textAlign: "center", fontSize: "3rem", marginBottom: "5px", marginRight: "8px"}} />{heading}</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbar">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/home" ? "active" : ""}`} style={{ fontSize: "1.5rem" }} aria-current="page" to="/home">Home</Link>
                            </li>
                            <li className="nav-item">
                                { localStorage.getItem("token") ? <Link className={`nav-link ${location.pathname === "/posts" ? "active" : ""}`} style={{ fontSize: "1.5rem" }} to="/posts">Add Posts</Link> : <Link to="/home" />}
                            </li>
                        </ul>

                        {localStorage.getItem('token') ?
                            <div className="d-flex align-items-center justify-content-center" style={{ background: "dark" }}>
                                <Link to="/search"><i className="fas fa-search mx-2" style={{ fontSize: "3rem", color: "#fff", cursor: "pointer" }}></i></Link>
                                <div onClick={ updateModal } style={{ fontSize: "3rem", color: "#fff", cursor: "pointer" }}><AiOutlineUser /></div>
                                <button onClick={logout} type='button' style={{ background: "dark" }} className="logout_btn"><BiLogOut /></button>
                            </div> : <div className="d-flex align-items-center justify-content-center">
                                <Link to="/search"><i className="fas fa-search mx-2" style={{ fontSize: "3rem", color: "#fff", cursor: "pointer" }}></i></Link>
                                <div onClick={ updateModal } style={{ fontSize: "3rem", color: "#fff", cursor: "pointer" }}><AiOutlineUser /></div>
                                <Link to="/login" type='button' className='login_btn'><CiLogin /></Link>
                            </div>}
                    </div>
                </div>
            </nav>

            <User open={ ref }/>
        </div>
    )
}

export default Navbar