import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
const Home = () => {
  return (
    <div>
    
    <div className='home'>
    <Navbar/>
     <div className='home1'>
      <h1 style={{textAlign:"center",color:"black"}}>Quizard</h1> 
      <h6 style={{marginLeft:"20px"}}>Multiple quizzes to challenge you on multiple topics</h6>
      <h5 style={{marginLeft:"120px"}}>Start the Quiz</h5>
      <p style={{marginLeft:"120px"}}>Good Luck!</p>
      <div className='img'>

      </div> <br></br>
      <button style={{marginLeft:"120px",backgroundColor:"aqua",borderColor:"aqua",width:"30%",height:"5vh",borderRadius:"8px"}}><Link style={{textDecoration:"none",color:"black"}} to='/quiz'>Start Playing</Link></button>
     </div>
    </div>
      
    </div>
  )
}

export default Home
