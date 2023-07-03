import React, { useContext, useState } from 'react'
import { Link } from "react-router-dom"
import { FaUserAlt } from "react-icons/fa"
import { GiCancel } from "react-icons/gi"
import { BiSolidDashboard,BiLogoBlogger } from "react-icons/bi"
import { AiFillDelete } from "react-icons/ai"
import blogContext from '../../Context/blogContext'

const Dashboard = () => {

  const [search, setSearch] = useState("")

  const { dashData, deleteUser } = useContext(blogContext)

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const cancel = () => {
    setSearch("")
  }

  return (
    <>
      <div className='container fs-2' style={{ marginTop: "8rem", textAlign: "center" }}><BiSolidDashboard style={{ margin: '0rem 1rem' }} />Welcome to the Dashboard</div>

      <div className="container">
        <div id='User History'>

          <h1 className='heading fs-2' style={{ textAlign: "center", margin: "2rem" }}><FaUserAlt />User Details</h1>

          <div className='row container input-group'>
            <div className='d-flex justify-content-center align-items-center' >
              <input className='search form-control' value={search} type="text" placeholder="seach..." onChange={handleChange} />
              <button className='' onClick={cancel}><GiCancel style={{ fontSize: "2rem" }} /></button>
            </div>


            <table className="table" style={{ fontSize: "1.5rem" }} >
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Emails</th>
                  <th scope="col">Role</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              {dashData && dashData.filter((value) => {
                if (search === "") {
                  return value
                }
                else if (value.name.toLowerCase().includes(search.toLowerCase())) {
                  return value;
                }
                else if (new Date(value.createdAt).toGMTString().toLowerCase().includes(search.toLowerCase())) {
                  return value;
                }
              }).map((value, index) => {
                return (

                  <tbody key={value._id}>
                    <tr key={value._id}>
                      <th scope="row">{index}</th>
                      <td className='m-4'>{value.name}</td>
                      <td className='m-4'>{value.email}</td>
                      <td className='m-4'>{value.role === 1 ? "Admin" : "User"}</td>
                      <td className='m-4'>{new Date(value.createdAt).toGMTString()}</td>
                      <td onClick={() => deleteUser(value._id)} className='btn btn-danger bg-danger m-1 fs-3'><AiFillDelete /></td>
                      <Link to="/allPosts"><td  className='btn btn-primary bg-primary m-1'><BiLogoBlogger /></td></Link>

                    </tr>
                  </tbody>

                )
              })}
            </table>
          </div>

        </div>
      </div>
    </>
  )
}

export default Dashboard