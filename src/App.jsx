import React from 'react'
import Login from './Components/Auth/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './Components/Auth/Register';

const App = () => {
  return (
    
    <main className="bg-slate-300/20  h-full">
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/login" element={<Login />} />
           <Route path="/register" element={<Register />} />
          {/*<Route path="/project" element={<Projects />} />
          <Route path="/contact" element={<Contact />} /> */}
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App