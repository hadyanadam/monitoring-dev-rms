import { useState } from 'react'
import EchartStacked from './components/EchartStacked'
import InputForm from './components/inputForm'
import './App.css'

function App() {
  const [generate, setGenerate] = useState(false)
  const [ipAddress, setIpAddress] = useState('')
  return (
    <div className="App">
      <InputForm
        generate={generate}
        setGenerate={setGenerate}
        ipAddress={ipAddress}
        setIpAddress={setIpAddress}
      />
      <EchartStacked
        generate={generate}
        setGenerate={setGenerate}
        ipAddress={ipAddress}
        setIpAddress={setIpAddress}
      />
    </div>
  );
}

export default App