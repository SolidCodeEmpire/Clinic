import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddPatient from './Components/Contents/AddPatient/AddPatient';


function App() {
  // GET USER
  const [user, setUser] = useState({
    username: "dawjiez",
    role: "receptionist"
  })

  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);

  const lightTheme =
  `--titlebar-color: #121e55;
  --navbar-color: #218df3;
  --navbar-hover-color: #lightblue;
  --main-content-color: #fffffc;
  --font-color: #1a1a1a;`
  
  const darkTheme =
  `--titlebar-color: #000000;
  --navbar-color: #101010;
  --navbar-hover-color: #808080;
  --main-content-color: #353535;
  --font-color: #fffff0;`
  
  // Set new colors
  var root = document.documentElement;
  root.style.cssText = isDarkTheme ? darkTheme : lightTheme;

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
              </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
