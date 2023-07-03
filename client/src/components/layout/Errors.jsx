import React from 'react'
import { Link } from 'react-router-dom'

const Errors = () => {
  return (
    <>
    <div style={{ margin: "8rem", textAlign: "center" }} className='container'>
    <div>Only for Admoins</div>
    <Link to="/home"> --- Go back to home page</Link>
    </div>
    </>
  )
}

export default Errors