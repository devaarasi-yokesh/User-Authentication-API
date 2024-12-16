import { useRef, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css';

function Input(props){
const ref1 = useRef('');
const ref2 = useRef('');
let ref3 = useRef("");

let [user, setUser] = useState('');
let [pwd, setPwd] = useState('');
let [output, setOutput] = useState('');
const handleClick = async () => {
  let obj = {};
  let user = ref1.current.value;
  let pwd = ref2.current.value;
  console.log(user,pwd)

  // Before storing the form input details, make sure both fields has no undefined value.
  if(!user || !pwd){
    alert("Both username and password are required");
    return;
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

  return(
    <>
   <p>Username</p>
   <input type="text" ref={ref1}/>
   <p>Password</p>
   <input type="text" ref={ref2}/>
   <button className='mt-4 btn row btn-secondary justify-content-center' onClick={handleClick}>Register</button>
   <button className='m-5 btn row btn-primary' onClick={checkPassword}>Login</button>
   <p ref={ref3}>{output}</p>
    </>
  )
}



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1>Sign-up</h1>
      <Input />
    </>
  )
}

export default App
