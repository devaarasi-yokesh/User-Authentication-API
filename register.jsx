import { useState,useRef } from "react";

export function Forms(props){

const ref1 = useRef('');
const ref2 = useRef('');
let ref3 = useRef("");
let ref4 = useRef("");
let myref = useRef("");
let [output, setOutput] = useState(' ');
let[info,setInfo] = useState('');
const handleClick = async () => {
    let obj = {};
    let user = ref1.current.value;
    let pwd = ref2.current.value;
    let pwd2 = ref4.current.value;
    console.log(user,pwd)
  
    // Before storing the form input details, make sure both fields has no undefined value.
    if( !user || !pwd ){
      setInfo("Fill the required field");
      alert("Both username and password are required");
      ref1.current.value = "";
      ref2.current.value = "";
      ref4.current.value = "";
      return;
    }
    else if((pwd !== pwd2)){
        setInfo("Passwords should be matching");
        alert("Both passwords should be matching.");
        ref1.current.value = "";
        ref2.current.value = "";
        ref4.current.value = "";
        return
    }
  
    obj["user"] = user;
    obj["password"] = pwd;
  
   try{     // When fetching data from server always use try catch to show success fetch and error details as well.
  
    if(user && pwd){
      const response = await fetch('http://localhost:3002/add', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(obj),
      });
  
      const data = await response.json();
      console.log(data)
      if(data.message === 'Details added') {
        ref1.current.value = "";
        ref2.current.value = "";
        ref4.current.value = "";
        setOutput("Account Created!");
        // obj.keys(ob).forEach(key => delete ob[key]);
        console.log(data)
      }
    }
  }
  catch(error){
    console.log("Error:", error);
    alert("An error occured while adding details.");
  }
  
  }
  function showLogin(){
        props.onClick(false,true);
  }
    return(
        <>
        <form action="">
  <div className='form-group'>
   <p className='mt-5 fs-5'>Username</p>
   <input type="text" ref={ref1} className='form-control'/>
   <p className='mt-5 fs-5' >Enter a password</p>
   <input type="password" ref={ref2} className='form-control'/>
   <p className='mt-5 fs-5'>Confirm your password</p>
   <input type="password" ref={ref4} className='form-control'/>
   <p ref={myref} className="text-danger">{info}</p>
   <button className="btn col-12 btn-primary mt-5"  onClick={handleClick} >Register</button>
   <button className="btn col-12 btn-warning mt-5" onClick={showLogin}>Login</button>
   <p ref={ref3}>{output}</p>
   </div>
   </form>
        </>
    )
}