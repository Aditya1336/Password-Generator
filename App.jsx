import { useCallback, useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setnumAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password,setPassword] = useState("");

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass="";
    let string="ABCDEFGHIJKLMONPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numAllowed) string+="0123456789";
    if(charAllowed) string +="~!@#$%^&*(){}`"

    for(let i=0;i<=length;i++){
      let char = Math.floor(Math.random()*string.length + 1);
      pass += string.charAt(char); 
    }

    setPassword(pass)

  },[length,numAllowed,charAllowed,setPassword]);

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current.select();
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator();
  },[length,numAllowed,charAllowed,passwordGenerator])

  return (
    <>
      
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg mt-5 px-4 my-2 relative top-50 text-orange-500 bg-gray-700">
        <h1 className="text-2xl text-center pt-3 text-white">Password Generator</h1>
        <div className="flex overflow-hidden pb-8 mt-5 bg-gray outline-none">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 rounded-lg bg-white text-black"
            placeholder="password"
            readOnly
            ref = {passwordRef}
          />

          <button className="outline-none bg-blue-700 text-white mx-3 px-3 py-0.5 shrink-0"
            onClick={copyPasswordToClipboard}
          >Copy</button>
        </div>

        <div className="flex text-sm gap-x-3">
          <div className="flex items-center gap-x-1 pb-4">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e)=>{setLength(e.target.value)}}
            />
              <label>Length:{length}</label>
          </div>

          <div className="flex items-center gap-x-1 pb-4">
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              id="numberInput"
              onChange={()=>{setnumAllowed((prev)=>!prev);}}
            />
              <label htmlFor='numberInput'>Numbers</label>
          </div>

          <div className="flex items-center gap-x-1 pb-4">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={()=>{setcharAllowed((prev)=>!prev);}}
            />
              <label htmlFor='charInput'>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
