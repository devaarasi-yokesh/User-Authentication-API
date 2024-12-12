import { useRef, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css';

function Input(props){
const ref1 = useRef('');
const ref2 = useRef('');
let ref3 = useRef("");
const handleClick = async () => {
  let user = ref1.current.value;
  let pwd = ref2.current.value;
 
  if(user){
    const response = await fetch('http://localhost:3002/add', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({user,pwd}),
    });

    const data = await response.json();
    if(data.message === 'Details added') {
      ref2.current.value = "yes";
    }
  }

}


  return(
    <>
   <p>Username</p>
   <input type="text" ref={ref1}/>
   <p>Password</p>
   <input type="text" ref={ref2}/>
   <button className='mt-4 d-block' onClick={handleClick}>Register</button>
   <button >Info</button>
   <div ref={ref3}></div>
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
