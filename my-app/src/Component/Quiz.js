import React, { useEffect, useState } from 'react'
import './Quiz.css'
import { QuizData } from '../Data/QuizData'
import QuizResult from '../Component/QuizResult'
import Navbar from '../Navbar/Navbar'

const Quiz = () => {
    const[currentQuestion, setCurrentQuestion]=useState(0)
    const[score,setScore]=useState(0)
    const[clickedOption,setClickedOption]=useState(0)
    const[showResult,setShowResult]=useState(false)

  const [second,setSecond]=useState(0)
    const changeQuestion=()=>{
        updateScore()
        if(currentQuestion<QuizData.length-1){
            setCurrentQuestion(currentQuestion+1) 
            setClickedOption(0)
        }else{
                setShowResult(true)
        }


    }
     const deadline="December ,31,2022"
    const getTime=()=>{
        const time=Date.parse(deadline) - Date.now();
        setSecond(Math.floor((time/1000)%60));
    }
    useEffect(()=>{
        const interval=setInterval(()=>getTime(deadline),1000)
        return ()=>clearInterval(interval);
    },[]);
//   const TimerComponent=()=>{
//     const[timerValue,setTimerValue]=useState(0)
// useEffect(()=>{
//     const timerId = setTimeout(() => {
//         setTimerValue(timerValue + 1);
//       }, 1000);
//       return () => clearTimeout(timerId);

// },[timerValue])
//   }
   
    const previousQuestion=()=>{
        setCurrentQuestion(currentQuestion-1)


    }
    const updateScore=()=>{
        if(clickedOption===QuizData[currentQuestion].answer){
            setScore(score+1)
        }
    }
    const resultAll=()=>{
        setShowResult(false)
        setCurrentQuestion(0)
        setClickedOption(0)
        setScore(0)
        
    }
  return (
    
    <div>
    <Navbar/>
    
    <div className='quiz'>
  <div style={{color:"white"}} className='timer'>
   {second}
    </div>  
    
    <h2 style={{marginTop:"20px",textAlign:"center",color:"white", fontFamily:"-moz-initial",fontSize:"25px"}}>QUIZ APP</h2>
   
    <div className='box'>
    {
        showResult ? (
            <QuizResult score={score} totalScore={QuizData.length} tryAgain={resultAll}/>
        ):(
        <>
    
    <div className='question'>
    <span style={{padding:"5px"}}  id='question-number'>{currentQuestion+1}</span>
    <span style={{padding:"5px"}} id='question-txt'>{QuizData[currentQuestion].question}</span>



    </div>
    <div className='option'>
    {
        QuizData[currentQuestion].options.map((option,i)=>{
            return(
                <>
                 <button 
               className=  {`option-btn ${
                    clickedOption==i+1? "checked":null
                 }`}
                  
                key={i}               
                 onClick={()=>setClickedOption(i+1)} 
                >
     {option}
                </button>
                </>
            )

        })

        }
   

    </div>
     <input style={{backgroundColor:"#3aaccb",borderRadius:"5px", borderColor:"#3aaccb",height:"4vh",width:"20%",boxShadow:"0px 0px 10px",color:"white",marginLeft:"20px"}}  type='button' id='next-button' value='Previous' onClick={previousQuestion}></input>
     <input style={{backgroundColor:"#3aaccb",borderRadius:"5px", borderColor:"#3aaccb",height:"4vh",width:"15%",boxShadow:"0px 0px 10px",color:"white",marginLeft:"170px"}}  type='button' id='next-button' value='Next' onClick={changeQuestion}></input>
</>)}
    </div>
    </div>
      
    </div>
  )
}

export default Quiz
