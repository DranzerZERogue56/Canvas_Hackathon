import React from 'react'
import API_Key_Landing from './API_Key_Landing'
import './App.css'   /* <-- fix: import the CSS so the background & centering apply */
import CALENDAR_PAGE from './Calendar_Page'

function App() {
  return (
    <main className="app-main">
      <CALENDAR_PAGE />
    </main>
  )
}

export default App
