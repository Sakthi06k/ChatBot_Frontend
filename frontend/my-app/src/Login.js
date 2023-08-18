import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import image1 from './Images/banner_banner.png';
import image2 from './Images/shakti-logo.png';

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const signin = () => {
    axios.post('http://localhost:5000/Login',
      {
        email,
        pass
      }
    )
      .then((data) => {
        if (data.data.status === 'ok') {
          window.location.href = `/${email}`
          localStorage.setItem("your_email", email);
        } else {
          alert("Invalid information");
        }
      })
      .catch((err) => { console.log(err) })
  }

  return (
    <div className='bodi'>
      <div className='card'>
        <div className='logo'style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <img className="log"height={90} width={300} style={{display:'flex',justifyContent:'center',alignItems:'center',paddingTop:10,paddingBottom:10}} src={image2}></img>       
         </div>
        <div className="content">
          <div className='car_imag'>
             <img height={400} width={625} src={image1}></img>
          </div>
          <div className='main_content'> 
            <h2 className='signin'>Sign In</h2>

            <div className='labels'>    
            <label className='lab'>Email</label><br></br>
            <input type='email'placeholder='Email' name='email' required onChange={(e) => setEmail(e.target.value)}></input><br></br>
            <label className='lab'>Password</label><br></br>
            <input type='password'placeholder='Password' name='pass' required onChange={(e) => setPass(e.target.value)}></input><br></br>
            </div>     
            <div className='buttons'>
                <div ><button className='original-button ' onClick={signin}>Login</button><br></br></div>
                <div ><Link to='/Signup'><button className='regbutton'>Register </button></Link></div>
            </div>
          </div>
        </div>
      </div>
       <p className='para'>©2024 All rights reserved.</p>
    </div>
  )
}

export default Login