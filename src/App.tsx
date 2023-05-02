
import './App.css'
import { ParticlesSketch } from './ParticlesSketch'
//import { MySketch } from './Sketch'

function App() {

  return (
    <>
      <h1>Graphics</h1>
      <div className="card">
        <ParticlesSketch />
      </div>
      <p className="read-the-docs">
        made with p5.js
      </p>
    </>
  )
}

export default App
