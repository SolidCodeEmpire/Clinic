import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Components/Common/Navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "./Components/Common/Login/Login";
import Calendar from "./Components/Contents/Calendar/Calendar";
import AddPatient from "./Components/Contents/Registrar/AddPatient/AddPatient";
import AddVisit from "./Components/Contents/Registrar/AddVisit/AddVisit";
import ViewPatients from "./Components/Contents/Registrar/ViewPatients/ViewPatients";
import Admin from "./Components/Contents/Admin/AdminApp/Admin";
import { Doctor } from "./API/Model/DoctorModel";
import { fetchDoctorById } from "./API/Service/DoctorService";

type User = {
  username: string | undefined;
  role: string;
};

/**
 *
 * @returns React component
 */
function App() {
  const [user, setUser] = useState<User>();

  return (
    <>
      {user ? (
        user.role === "admin" ? (
          <Admin userDispatcher={setUser} />
        ) : (
          <MainApp user={user} userDispatcher={setUser} />
        )
      ) : (
        <LoginPage userDispatcher={setUser} />
      )}
    </>
  );
}

type MainAppProps = {
  user: User;
  userDispatcher: React.Dispatch<React.SetStateAction<User | undefined>>;
};

function renderRoutes(role: string) {
  switch (role) {
    case "receptionist": 
      return <ReceptionistRoutes></ReceptionistRoutes>
    case "doctor":
      return <DoctorRoutes></DoctorRoutes>;
    case "supervisor":
      return supervisorRoutes();
    case "technician":
      return technicianRoutes();
    default:
      alert(
        "There was an error associated with role management. Contact admin."
      );
  }
}

function MainApp(props: MainAppProps) {
  return (
    <BrowserRouter>
      <div className="main-container">
        <div className="main-container-titlebar">
          <h1>E-Clinic</h1>
          <button onClick={() => props.userDispatcher(undefined)}>
            logout
          </button>
        </div>
        <div className="main-container-content">
          <Navbar role={props.user.role}></Navbar>
          <div className="content">{renderRoutes(props.user.role)}</div>
        </div>
      </div>
    </BrowserRouter>
  );
}

function ReceptionistRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<h1>Main Page</h1>} />
        <Route path="*" element={<h1>404-Not found</h1>} />
        <Route path="/add-patient" element={<AddPatient />}></Route>
        <Route path="/view-patients" element={<ViewPatients />}></Route>
        <Route path="/add-visit" element={<AddVisit />}></Route>
        <Route path="/calendar" element={<Calendar doctor={undefined} />}></Route>
      </Routes>
    </>
  );
}

/* to do */
function DoctorRoutes() {
  const [doctor, setDoctor] = useState<Doctor>();

  useEffect(() => {
    fetchDoctorById(1, setDoctor);
  },[]);

  return (
    <>
      <Routes>
        <Route path="/" element={<h1>Main Page</h1>} />
        <Route path="*" element={<h1>404-Not found</h1>} />
        <Route path="/calendar" element={<Calendar doctor={doctor} />} />
        {/* <Route path="/view-examinations" element={<ViewExaminations doctor={doctor}/>} /> */}
      </Routes>
    </>
  );
}

function supervisorRoutes() {
  return (
    <>
      <Route path="/test" element={<h1>test</h1>}></Route>
    </>
  );
}

function technicianRoutes() {
  return (
    <>
      <Route path="/test" element={<h1>test</h1>}></Route>
    </>
  );
}

export default App;
