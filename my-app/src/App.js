import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Quiz from './Component/Quiz';
import Home from './Component/Home';
import SignUp from './Auth/SignUp';
import Login from './Auth/Login';
import Navbar from './Navbar/Navbar'
function App() {
  return (
  <>
  <BrowserRouter>
  <Routes>
  <Route path="/quiz" element={<Quiz />}></Route>
   <Route path="/home" element={<Home/>}></Route> 
   <Route path="/signup" element={<SignUp/>}></Route> 
   <Route path="/" element={<Login/>}></Route> 
   <Route path="/navbar" element={<Navbar/>}></Route> 

  </Routes>

  </BrowserRouter>

   </>
  );
}

export default App;
