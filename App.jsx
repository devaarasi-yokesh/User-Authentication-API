import { useRef, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import {Forms} from './register.jsx'

function Input(props){
const ref1 = useRef('');
const ref2 = useRef('');
let ref3 = useRef("");

let [user, setUser] = useState('');
let [pwd, setPwd] = useState('');
let [output, setOutput] = useState('');

const checkPassword = async () => {
  let obj = {};
  let user = ref1.current.value;
  let pwd = ref2.current.value;
  // Before storing the form input details, make sure both fields has no undefined value.
  if(!user || !pwd){
    alert("Both username and password are required");
    return;
  }

  obj["user"] = user;
  obj["password"] = pwd;

try{
  const response = await fetch('http://localhost:3002/check',{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body:  JSON.stringify(obj)
  });

  const data = await response.json();
  console.log(data)
  if(data.message === "Logged In Successfully"){
   setOutput("Success!");
  }
  else{
    setOutput(data.message);
  }
}
catch(error){
  alert("Incorrect password or username!");
}
}

function showComponent(){
    props.onClick(true,false);
}

  return(
    <>
  <form action="">
  <div className='form-group'>
   <p className='mt-5 fs-5'>Username</p>
   <input type="text" ref={ref1} className='form-control'/>
   <p className='mt-5 fs-5'>Password</p>
   <input type="password" ref={ref2} className='form-control'/>
   <button className='mt-5 btn btn-primary col-12' onClick={checkPassword}>Login</button>
   <p className='mt-4'>Don't have an account?&nbsp;<a href="#" onClick={showComponent} className='text-danger'>Register</a> here.</p>
   <p ref={ref3}>{output}</p>
   </div>
   </form>
    </>
  )
}



function Logo(){
  return(
    <>
    <div className='bg-danger logo'>
    </div>
    </>
  )
}

function App() {

let [login, showLogin] = useState(true);
let [register,showRegister] = useState(false);

  function makeTrue(value1,value2){
    showRegister(value1);
    showLogin(value2);
  }

  return (
    <>
    <Logo/>
    <h1 className='display-6 text-success text-center'>Deez-Spice</h1>
    {login && <Input onClick={makeTrue}/>}
    {register && <Forms onClick={makeTrue}/>}
    </>
  )
}

export default App
