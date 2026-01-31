import React from 'react'
import './App.css'
import HiddenCharInput from './Calendar_Page'

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="app-title">Canvas Hackathon</div>
      </header>

      <main className="app-main">
        <HiddenCharInput />
      </main>
    </div>
  )
}

export default App
