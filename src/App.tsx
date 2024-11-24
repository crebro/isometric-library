import './App.css'
import { ReactP5Wrapper } from '@p5-wrapper/react'
import sketch from './sketch'

function App() {
  return (
    <>
      <ReactP5Wrapper sketch={sketch} />
    </>
  )
}

export default App
