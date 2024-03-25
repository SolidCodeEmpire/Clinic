import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Xd from './Components/Contents/Hello';

function App() {
  // GET USER
  const [user, setUser] = useState({
    username: "dawjiez",
    role: "receptionist"
  })

  return (
    <div className='main-container'>
      <div className='main-container-titlebar'>

      </div>
      <div className='main-container-content'>

        <Navbar role={user.role}></Navbar>
        <div className='content'>
          <BrowserRouter>
            <Routes>
              <Route path='/index' element=<Xd/> />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
    
  );
}

export default App;
