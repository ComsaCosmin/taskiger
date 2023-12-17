import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Register from './components/register';
import Layout from './components/Layout'
import Dashboard from './components/Dashboard'


function App() {

  function isLoggedIn() {
   return localStorage.getItem('token') != undefined
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLoggedIn() ?<Dashboard/>:  <Layout />}>
          
        </Route>
        <Route path="/register" element={<Register />}>
          
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
