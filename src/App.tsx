import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [input, setInput] = useState('');

  const handleChange = (event: any) => {
    setInput(event.target.value);
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div>
        <h1>Vulnerable React Component</h1>
        <p>Type some HTML or script into the input below:</p>
        <input type="text" onChange={handleChange} placeholder="Enter untrusted HTML" />
        {/* UNSAFE: using unsanitized input in dangerouslySetInnerHTML */}
        <div dangerouslySetInnerHTML={{ __html: input }} />
      </div>
    </>
  )
}

export default App
