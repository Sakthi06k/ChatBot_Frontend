import React, { useState } from 'react';
import axios from 'axios';
import './chat.css';
import { Link, json, useParams } from 'react-router-dom';

function Chat() {
  const {mail} = useParams();
  const wmess = "How May I help You";
  const i="Welcome to Bishong travels! Our travels agencies aim is to provide our customer a world class best experience to our buses.I might to say that this is not bus this is a flight that goes to your destination with our cautious drivers,well trained staffs to assist our customers."
  const hoptions = ["Book Tickets","About Us"];
  const [lucky,setLucky]=useState(50);
  const [orange,setOrange]=useState(70);
  const [Res, setRes] = useState([]);
  const [arr,setArr]=useState([]);
  const[purchase,setPurchase]=useState(false)
  const[info,setInfo]=useState(false)
  const [det,setDet]=useState("")
  const[conf,setConf]=useState(false)
  const[temp,setTemp]=useState(false)
  const[city,setCity]=useState(false)
  const [bus,setBus]=useState("")
  const [u_name,setU_name]=useState("")
  const [u_seat,setU_seat]=useState("")
  const [u_mail,setU_mail]=useState("")
  const [u_no,setU_no]=useState("")
  const [u_date,setU_date]=useState("")
  const [u_time,setU_time]=useState("")
  const [u_city,setU_city]=useState("")
  const[flag,setFlag]=useState(false);
  const[your_email,setyour_email]=useState("");
  const[chat,setChat]=useState(false);

  const handleBook=(wel,opt)=>{
    setRes([...Res, wel, opt]);
    // setPurchase(true);
    setCity(true)
  }
  const handleInfo=(wel,opt)=>{
    setRes([...Res, wel, opt,i,wel]);
    setInfo(true)
  }
  const st_book = (e)=>{
    e.preventDefault();
    const busrute=u_city;
    setRes([...Res,busrute]);
    setPurchase(true);
  }
  const check = (e)=>{
    e.preventDefault();
    
    const avail=(u_city=="lucky")?(lucky):(orange)
    
    if(u_seat<=avail){
      const detail = `The passenger named ${u_name} has booked tickets ${u_seat} in the bus name ${bus} is now locked. You will be contacted by our drivers with your number ${u_no} and mail id ${u_mail} on ${u_date} at ${u_time}.`;
      setDet(detail)
      setRes([...Res,detail+"\n Happy Journey \n Rs. 239 per person \n \n Total : 239 \n help line number: 8883422541"]);
      if(u_city=="lucy"){
        setLucky(lucky-u_city)
      }else if(u_city=="orange"){
        setOrange(orange-u_city)
      }
      setConf(true);
    }
    else{
      const detail = "No tickets available"
      alert("No tickets available")
      setRes([...Res,detail]);
      setTemp(true);
    } 
  }
   
  const endchat= ()=>{
    setRes(Res.push("Chat Ended"));
    alert(Res);
    axios.post('http://localhost:5000/EndChat',
        {
            Res,
            mail,
        }
    )
    .then(data=>{
        alert(data.data.status);
    })
    .catch(err=>{console.log(err) })
    }

    // ***************************************

    const loadchat = ()=>{
      alert(mail);
      axios.post('http://localhost:5000/LoadChat',
        {
            Res,
            u_mail,
            mail
        }
      )
      .then(data => {
        setChat(data.data.status);
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      })
    }

  return (
    <div className='Message'>
        
        <>
        {your_email}
        {/* <h1>hello, welcome {}</h1> */}
        <button className='botbutton' id='button' onClick={loadchat}>Load old chats</button>
        
          <p className='bot'>{wmess}</p>
          <button className='botbutton' id='button' onClick={()=>handleBook(wmess,hoptions[0])}>{hoptions[0]}</button>
          <button className='botbutton' onClick={()=>handleInfo(wmess,hoptions[1])}>{hoptions[1]}</button>
          {info &&(
            <>
            <p className='reply'>Forwarding</p>
            <p className='bot'>{i}</p>
            <button className='botbutton' id='button' onClick={()=>handleBook(wmess,hoptions[0])}>{hoptions[0]}</button>
            </>
          )
          }
          {
            city&&(
              <>
              <form onSubmit={(e) => {st_book(e)}}>
              <input list='bus' name='bus' onChange={(e) => setU_city(e.target.value)} placeholder='Select city of the bus' required></input>
              <datalist id='bus'>
                <option value={"chennai"}></option>
                <option value={"mumbai"}></option>
              </datalist>
              <button className='botbutton' id='button2' type='sumbit'>check</button>
              </form>
              </>
            )
          }
          {purchase && (
            
             <form onSubmit={(e) => {check(e)}}>
            <div className='book'>
              <input type='text' placeholder='Enter name' name='nme' onChange={(e) => setU_name(e.target.value)} required></input><br></br>
              <input type='number' name='no' min={1} max={10} onChange={(e) => setU_seat(e.target.value)} placeholder='Enter number of passengers' required></input><br></br>
              <input type='email' name='mail' onChange={(e) => setU_mail(e.target.value)} placeholder='Enter contact to mail' required></input><br></br>
              <input type='number' name='pno' onChange={(e) => setU_no(e.target.value)} min={1111111111} placeholder='Enter number of contact' title='Enter valid phone number' max={9999999999} required></input><br></br>
              <input list='bus' name='bus' onChange={(e) => setBus(e.target.value)} placeholder='Select Name of the bus' required></input>
              <datalist id='bus'>
                <option value={"orange"}></option>
                <option value={"lucky"}></option>
              </datalist>
              <input type='date' name='date' onChange={(e) => setU_date(e.target.value)} required placeholder='Enter your date'></input>
              <input list='time' name='time' onChange={(e) => setU_time(e.target.value)} required placeholder='Enter time of travel'></input>
              <datalist id='time' >
                <option value={"8.00 pm"}></option>
                <option value={"10.00 pm"}></option>
                <option value={"11.00 pm"}></option>
              </datalist>
              <button className='botbutton' id='button2' type='sumbit' >Submit</button>
              {/* <input type='sumbit' className='botbutton' id='button2' onClick={Book}>Book Ticket</input> */}
            </div>
            </form>
          )
}
{
          (conf &&(
            <>
            <p>{det}</p>
            <p className='bot'>Happy Journey</p><br></br>
            <p>Rs. 239 per person </p>
            <p>Total : {parseInt(u_seat)*239}</p>
            <p>help line number: 8883422541</p>
            <br></br>
            <button className='botbutton' id='button2' onClick={endchat} type='sumbit' >End chat</button>            <br></br>

            </>
          ))
          }{
            temp && (<p>Try another bus for your journey</p>)
          } 
          <p>
            {
              chat && chat.map((item,index)=>{
                if(index%2==0){
                  return(<h5 key={index}>{item}</h5>)
                }
                else{
                  return(<h2 key={index} style={{"color":"blue"}}>{item}</h2>)
                }
              })
            }
          </p>
        </>
        <Link to='/'><button>Log Out</button></Link>
    </div>
  );
}

export default Chat;