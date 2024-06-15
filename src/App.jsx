import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charcter, setCharacter] = useState(false);
  const [password, setPassword] = useState();



const passwordRef = useRef(null)

  const pass = useCallback(() => {
    let password = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charcter) str += "!@#$%^&*()_+";

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      password += str.charAt(char);
    }

    setPassword(password);
  }, [length, numberAllowed, charcter, setPassword]);


const copyPasswordToClipboard = useCallback(()=> {
  passwordRef.current?.select();
  // passwordRef.current?.setSelectionRange(0,5)
  window.navigator.clipboard.writeText(password)
},[password])

useEffect(()=>{
pass()
},[length,numberAllowed,charcter, pass])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-2 my-8 text-orange-500 bg-gray-700">
        <h1 className="text-white text-center my-3">password Genrator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 "
            placeholder="password"
            readOnly
            ref={ passwordRef }
          />
          <button onClick={copyPasswordToClipboard} className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex item-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex text-sm gap-x-2">
            <input 
            type ="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={()=>{
              setNumberAllowed((prev) => !prev)
            }}
            />
            <label htmlFor="numberInput" >Number</label>
          </div>
          <div className="flex text-sm gap-x-2">
            <input 
            type ="checkbox"
            defaultChecked={charcter}
            id="charcterInput"
            onChange={()=>{
              setCharacter((prev) => !prev)
            }}
            />
            <label htmlFor="charcterInput" >Charcter</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
