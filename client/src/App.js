import React, { useState } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import Navbar from "./components/layout/Navbar";
import Posts from "./components/pages/Posts/Posts";
import Home from "./components/pages/Home/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import BlogState from "./Context/blogState";
import Allposts from "./components/pages/Posts/Allposts";
import SinglePost from "./components/pages/Posts/SinglePost";
import Errors from "./components/layout/Errors";


function App() {

  const [isAdmin, setIsAdmin] = useState(true)
  return (

    <Router>
      <Navbar heading="Blogs" />
        <BlogState >
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          {isAdmin ? <Route path="/dashboard" element={<Dashboard />} />: <Route path="/error" element={<Errors />} /> }
          <Route path="/allPosts" element={<Allposts />} />
          <Route exact path="/singlePost/:id" element={<SinglePost />} />
      </Routes>
        </BlogState>
    </Router>
  );
}

export default App;
