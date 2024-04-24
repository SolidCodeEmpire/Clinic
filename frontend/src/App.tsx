import React, { useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddPatient from './Components/Contents/AddPatient/AddPatient';
import ViewPatients from './Components/Contents/ViewPatients/ViewPatients';
import AddVisit from './Components/Contents/AddVisit/AddVisit';
import Calendar from './Components/Contents/Calendar/Calendar';

/**
 * 
 * @returns React component
 */
function App() {
  // GET USER
  const [user, setUser] = useState({
    username: "user",
    role: "receptionist"
  });

  return (
    <>
      { user.role === 'admin' ? <AdminApp/> : <MainApp user={user}/> }
    </> 
  );
}

type MainAppProps = {
  user: User;
}

type User = {
   username:string
   role: string
}

function renderRoutes(role: string){
  switch(role){
    case "receptionist":
      return receptionistRoutes();
    case "doctor":
      return doctorRoutes();
    case "supervisor":
      return supervisorRoutes();
    case "technician":
      return technicianRoutes();
    default:
      alert("There was an error associated with role management. Contact admin.");
    }
}

function MainApp(props: MainAppProps) {
  return (
    <BrowserRouter>
      <div className='main-container'>
        <div className='main-container-titlebar'>
          <h1>E-Clinic</h1>
          <h1>Hello, {props.user.username}</h1>
          <h1>Log out</h1>
        </div>
        <div className='main-container-content'>
          <Navbar role={props.user.role}></Navbar>
          <div className='content'>
              <Routes>
                { renderRoutes(props.user.role) }
                <Route path='/' element={<h1>Main Page</h1>}/>
                <Route path='*' element={<h1>404-Not found</h1>}/>
              </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  )  
}

function receptionistRoutes() {
  return (
    <>
      <Route path='/add-patient' element={<AddPatient/>}></Route>
      <Route path='/view-patients' element={<ViewPatients/>}></Route>
      <Route path='/add-visit' element={<AddVisit/>}></Route>
      <Route path='/calendar' element={<Calendar/>}></Route>
    </>
  )
}

/* to do */
function doctorRoutes(){
  return (
    <>
      <Route path='/test' element={<h1>test</h1>}></Route>
    </>
  )
}

function supervisorRoutes(){
  return (
    <>
      <Route path='/test' element={<h1>test</h1>}></Route>
    </>
  )
}

function technicianRoutes(){
  return (
    <>
      <Route path='/test' element={<h1>test</h1>}></Route>
    </>
  )
}

function AdminApp() {
  return <h1>Admin panel</h1>
}

export default App;
