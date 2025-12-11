import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { HashRouter, Route, Routes } from 'react-router'
import Home from './components/Home'
import Calendar from './components/Calendar'
import Login from './components/Login'
import CheckIn from './components/CheckIn'

function App() {
  return <HashRouter>
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/calendar" element={<Calendar />}></Route>
      <Route path="/checkin" element={<CheckIn />}></Route>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  </HashRouter>
}

export default App
