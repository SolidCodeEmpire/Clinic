import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddPatient from './Components/Contents/AddPatient/AddPatient';
import ViewPatients from './Components/Contents/ViewPatients/ViewPatients';


function App() {
  // GET USER
  const [user, setUser] = useState({
    username: "user",
    role: "receptionist"
  })

  return (
    <BrowserRouter>
      <div className='main-container'>
        <div className='main-container-titlebar'>
          <h1>E-Clinic</h1>
          <h1>Hello, {user.username}</h1>
          <h1>Log out</h1>
        </div>
        <div className='main-container-content'>
          <Navbar role={user.role}></Navbar>
          <div className='content'>
              <Routes>
                <Route path='/add-patient' element={<AddPatient/>}></Route>
                <Route path='/view-patients' element={<ViewPatients/>}></Route>
              </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
