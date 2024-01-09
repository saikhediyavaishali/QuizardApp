import React from 'react'


const QuizResult = (props) => {
  return (
    <>
    
    <div style={{marginLeft:"100px",marginTop:"100px"}}>
     Your Score: {props.score}<br></br>
     Total Score:{props.totalScore}
    </div><br></br>
    <button style={{backgroundColor:"#3aaccb",marginLeft:"120px",borderRadius:"7px",backgroundColor:"#3aaccb"}} id="next-button" onClick={props.tryAgain}>Try again</button>
    </>
    
  )
}

export default QuizResult
