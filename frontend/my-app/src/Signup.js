import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './signup.css';
import image3 from './Images/signback.png';

function Signup() {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [address,setAddress]=useState("");
  const [pass,SetPass]=useState("");
  const [cpass,setCpass]=useState("");
  const [count,setCount]=useState(0);
  const validate = ()=>{
    if(pass===cpass){
      setCount(count+1);
      axios.post('http://localhost:5000/Signup',
        {
            count,
            name,
            email,
            address,
            pass,
            cpass
        }
    )
    .then((data)=>{
      alert(data.data.status)
      // console.log(data.data.status);
    })
    .catch((err)=>{console.log(err) })
    }
    // else{
    //   alert("password does not match");
    // }
  }

  return (
    <div >
      <div className='main-content'>
        <div className='back'>
        <h2 className='regist'>Register </h2>
        <label className='lable-top'>Full name</label><br></br>
        <input type='text' name='fname'placeholder='Full name' required onChange={(e) => setName(e.target.value)}></input><br></br>
        <label className='lable-top'>Email</label><br></br>
        <input type='email' name='email'placeholder='Email' required onChange={(e) => setEmail(e.target.value)}></input><br></br>
        <label className='lable-top'>Password</label><br></br>
        <input type='password' name='pass' placeholder='Password' required onChange={(e) => SetPass(e.target.value)}></input><br></br>
        <label className='lable-top'>Re-enter password</label><br></br>
        <input type='password' placeholder='Re-enter password'name='cpass' required onChange={(e) => setCpass(e.target.value)}></input><br></br>
        <label className='lable-top'  >Address</label><br></br>
        <input type='textarea' name='textarea'placeholder='Address' required onChange={(e) => setAddress(e.target.value)}></input><br></br>

        <Link to = '/'><button id='loginid'>Log in</button></Link>
        </div>
        </div>
    </div>

  )
}

export default Signup