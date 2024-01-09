import React ,{useState,useEffect} from 'react'
import './SignUp.css'
import {Field, Form, Formik,ErrorMessage} from 'formik'
import * as yup from 'yup'
import {ToastContainer,toast} from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { SignUpUser } from '../Slice/authSlice'
import "react-toastify/dist/ReactToastify.css";
import { clearState } from '../Slice/authSlice'

const initialState={
    userName:'',       
    userEmail:'',
    userPhone:'',
    userPassword:'',
    userCity:'',
    userState:''
 }
 const validationSchema= yup.object().shape({
    userName:yup.string().required("please enter your name"),
    userEmail:yup.string().required().email("please enter your email"),
    userPhone: yup.string().required("please enter your contact"),
    userPassword:yup.string().required("please enter your password").min(8,"password must be a 8 char"),
    userCity:yup.string().required("please enter your city"),
    userState:yup.string().required("please enter your state")
  })
  
const SignUp = () => {
 
  
  const [pic, setPic] = useState("");

 const dispatch=useDispatch()

 const data=useSelector((state)=>state.user)
 const{error,message,loading}=data
 const navigate = useNavigate()
 useEffect(()=>{
   if(error){
     toast.error(error,{position:toast.POSITION.TOP_CENTER})
   }
   if(message){
     toast.success(message,{position:toast.POSITION.TOP_CENTER})
     setTimeout(()=>{
      dispatch(clearState())
    },500)
   }
 })
const handleSubmit=(values)=>{
  let obj={  
  profilePic:pic,
      ...values,      
     }
     console.log(obj) 
      dispatch(SignUpUser(obj));
}
function picselect(e) {
  setPic(e.target.files[0]);
}


  return (
    <div>
    <ToastContainer/>
    <div className='sign'>
    <div className='up'>
    <Formik
     initialValues={initialState}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
    >
        <Form>
            <h1 style={{textAlign:"center",color:"blueviolet"}}>SignUp</h1>
            <Field style={{marginLeft:"30px",height:"5vh",width:"80%",borderRadius:"8px"}} type='Text' placeholder='Full Name' name="userName"></Field><br></br><br></br>
                  <ErrorMessage name="userName"></ErrorMessage>
                  <Field style={{marginLeft:"30px",height:"5vh",width:"80%",borderRadius:"8px"}} type='Text' placeholder='Email ID' name="userEmail"></Field><br></br><br></br>
                  <ErrorMessage name="userEmail"></ErrorMessage>
               
                 
                  <Field style={{marginLeft:"30px",height:"5vh",width:"80%",borderRadius:"8px"}} type='password' placeholder='password' name="userPassword"></Field><br></br><br></br>
                  <ErrorMessage name="userPassword"></ErrorMessage>
                  <Field style={{marginLeft:"30px",height:"5vh",width:"80%",borderRadius:"8px"}} type='text' placeholder='city' name="userCity"></Field><br></br><br></br>
                  <ErrorMessage name="userCity"></ErrorMessage>
                  <Field style={{marginLeft:"30px",height:"5vh",width:"80%",borderRadius:"8px"}} type='text' placeholder='state' name="userState"></Field><br></br><br></br>
                  <ErrorMessage name="userState"></ErrorMessage>
                  <Field style={{marginLeft:"30px",height:"5vh",width:"80%",borderRadius:"8px"}} type='number' placeholder='phone' name="userPhone"></Field><br></br><br></br>
                  <ErrorMessage name="useePhone"></ErrorMessage>
                  <input style={{marginLeft:"30px"}} type="file" onChange={picselect}></input>
              <br />

<input id='button' style={{width:"20%", marginLeft:"160px",backgroundColor:"blueviolet",borderRadius:"7px",color:"white"}} type='submit' value='Sign Up'></input><br></br>
<p style={{textAlign:"center"}}>I have already an account<Link style={{textDecoration:"none",color:"black"}} to ="/"> Login</Link></p>

        </Form>
    </Formik>

    

    </div>

    </div>
      
    </div>
  )
}

export default SignUp
