import React from 'react'
import './Navbar.css'
import quiz from "../Assests/Img/ql.png"

import { Link,useNavigate } from 'react-router-dom'
const Navbar = () => {
    const navigate=useNavigate();
    const res=localStorage.getItem("user")
  
    const user=JSON.parse(res);
    const handleLogout=()=>{
      localStorage.clear();
    }
  return (
    <div>
   <div className='nav'>
    <img
        style={{
            marginLeft: "20px",
            height: "12vh",
            marginTop: "8px",
            width: "100%", // Adjusted width for smaller screens
            maxWidth: "150px", // Set max-width for larger screens
        }}
        src={quiz}
        alt="Quiz Logo"
    />
    <h4
        style={{
            marginLeft: "20px", // Adjusted margin for smaller screens
            height: "5vh",
            width: "60%", // Adjusted width for smaller screens
            marginTop: "20px",
            fontSize: "1rem", // Adjusted font size for smaller screens
        }}
    >
        Welcome: {user?.userName}
    </h4>
    {/* Consider using CSS classes for styling and adding an alt attribute for accessibility */}
    {/* <img
        style={{
            height: "5vh",
            width: "20%",
            marginLeft: "20px",
            marginTop: "20px",
        }}
        src={`http://localhost:7000${user?.profilePic}`}
        className='Ayush'
        alt="User Profile"
    /> */}
    <button
        style={{
            width: "20%", // Adjusted width for smaller screens
            height: "5vh",
            marginTop: "20px",
            backgroundColor: "white",
            borderColor: "white",
            marginRight: "20px", // Adjusted margin for smaller screens
        }}
        onClick={handleLogout} // Removed double curly braces around handleLogout
        type='submit'
    >
        <Link
            style={{
                color: "black",
                textDecoration: "none",
            }}
            to="/"
        >
            Logout
        </Link>
    </button>
</div>

      
    </div>
  )
}

export default Navbar
