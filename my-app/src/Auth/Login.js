import React,{useEffect} from 'react'
import './Login.css'
import {Field, Form, Formik,ErrorMessage} from 'formik'
import * as yup from 'yup'
import { ToastContainer,toast } from 'react-toastify'
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { SignInUser,clearState } from '../Slice/authSlice'
import "react-toastify/dist/ReactToastify.css";

const  defaultvalue={
    userEmail:'',
    userPassword:''

   }

   const validationSchema= yup.object().shape({
          userEmail:yup.string().required().email("please enter your email"),
          userPassword:yup.string().required("please enter your password").min(8,"password must be a 8 char"),
        })
            
      
const Login = () => {
 const dispatch=useDispatch()
  const navigate = useNavigate();
  const data=useSelector((state)=>state.user)
  console.log(data)
  const{error,message,loading}=data
  useEffect(()=>{
    if(error){
      toast.error(error,{position:toast.POSITION.TOP_CENTER})
    }
    if(message){
      console.log(message)
      toast.success(message,{position:toast.POSITION.TOP_CENTER});
      setTimeout(()=>{
        dispatch(clearState())
        navigate('/home')
      }, 1000)
      
    }
   
  })
  const handleSubmit =  (values) => {
    console.log("value",values);
    let obj={  
  
        ...values,      
    }  

  dispatch(SignInUser(obj))
    
};
  
  return (
    <div>
    <ToastContainer/>
    <div className='login'>
        <div className='log'>
        <Formik
         initialValues={defaultvalue}
             validationSchema={validationSchema}
             onSubmit={handleSubmit}
        >
            <Form>
                <h1 style={{textAlign:"center",color:"blueviolet",marginTop:"20px"}}>Login</h1>
                <Field style={{marginLeft:"30px",height:"5vh",width:"80%",borderRadius:"8px"}} type='Text' placeholder='Email ID' name="userEmail"></Field><br></br><br></br>
                  <ErrorMessage name="useEmail"></ErrorMessage>
                  <Field style={{marginLeft:"30px",height:"5vh",width:"80%",borderRadius:"8px"}} type='password' placeholder='password' name="userPassword"></Field><br></br><br></br>
                  <ErrorMessage name="userPassword"></ErrorMessage><br></br>
                  <button style={{marginLeft:"150px",backgroundColor:"blueviolet",borderRadius:"7px",height:"5vh",color:"white",width:"14%"}} id='btn' type='submit' >Login</button>
                  <p style={{textAlign:"center"}}>I dont have an account</p>
                  <h4 style={{textAlign:"center"}}><Link to='/signup'>Register</Link></h4>
            </Form>
        </Formik>

        </div>
    </div>
      
    </div>
  )
}

export default Login
