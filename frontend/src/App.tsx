import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Components/Common/Navbar/Navbar";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { LoginPage } from "./Components/Common/Login/Login";
import { MainPage } from "./Components/Common/MainPage/MainPage";
import Calendar from "./Components/Contents/Calendar/Calendar";
import AddPatient from "./Components/Contents/Registrar/AddPatient/AddPatient";
import AddVisit from "./Components/Contents/Registrar/AddVisit/AddVisit";
import ViewPatients from "./Components/Contents/Registrar/ViewPatients/ViewPatients";
import Admin from "./Components/Contents/Admin/AdminApp/Admin";
import { Doctor } from "./API/Model/DoctorModel";
import { fetchDoctorById } from "./API/Service/DoctorService";
import { Visit } from "./Components/Contents/Doctor/Visit/Visit";
import { ViewExaminations } from "./Components/Contents/Doctor/ViewExaminations/ViewExaminations";
import { User } from "./API/Model/UserModel";


/**
 * Props for the MainApp component.
 */
type MainAppProps = {
  user: User;
  userDispatcher: React.Dispatch<React.SetStateAction<User | undefined>>;
};

/**
 * Renders the appropriate routes based on the user's role.
 * 
 * @param role - The user's role.
 * @returns The corresponding routes component based on the user's role.
 */
function renderRoutes(role: string) {
  switch (role) {
    case "MEDICAL_REGISTRAR":
      return <ReceptionistRoutes></ReceptionistRoutes>
    case "DOCTOR":
      return <DoctorRoutes></DoctorRoutes>;
    case "LAB_SUPERVISOR":
      return <SupervisorRoutes></SupervisorRoutes>;
    case "LAB_TECHNICIAN":
      return <TechnicianRoutes></TechnicianRoutes>;
    default:
      alert(
        "There was an error associated with role management. Contact admin."
      );
  }
}

/**
 * Renders the main application component.
 *
 * @param {MainAppProps} props - The props for the MainApp component.
 * @returns {JSX.Element} The rendered MainApp component.
 */
function MainApp(props: MainAppProps) {
  return (
    <BrowserRouter>
      <div className="main-container">
        <div className="main-container-titlebar">
          <a href="/" className="title-link" ><h1>E-Clinic</h1></a>
          <button onClick={() => {
            props.userDispatcher(undefined)
            localStorage.removeItem("token");
            localStorage.removeItem("id");
            localStorage.removeItem("username");
            localStorage.removeItem("role");
            window.location.href = "/";
          }}>
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


/**
 * Renders the routes for the receptionist.
 * Retrieves the receptionist's information based on local storage ID.
 * @returns {JSX.Element} The JSX element representing the routes for the receptionist.
 */
function ReceptionistRoutes() {

  /*to do*/
  // const [receptionist, setReceptionist] = useState<Doctor>();

  // useEffect(() => {
  //   const doctorId = Number.parseInt(localStorage.getItem("id") as string);
  //   if (doctorId) {
  //     fetchDoctorById(doctorId, setDoctor);
  //   }
  // }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<h1>404-Not found</h1>} />
        <Route path="/add-patient" element={<AddPatient />}></Route>
        <Route path="/view-patients" element={<ViewPatients />}></Route>
        <Route path="/add-visit" element={<AddVisit />}></Route>
        <Route path="/calendar" element={<Calendar doctor={undefined} />}></Route>
      </Routes>
    </>
  );
}

/**
 * Renders the routes for the doctor.
 * Retrieves the doctor's information based on local storage ID.
 * @returns {JSX.Element} The JSX element representing the routes for the doctor.
 */
function DoctorRoutes() {
  const [doctor, setDoctor] = useState<Doctor>();

  useEffect(() => {
    const doctorId = Number.parseInt(localStorage.getItem("id") as string);
    if (doctorId) {
      fetchDoctorById(doctorId, setDoctor);
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<h1>404-Not found</h1>} />
        <Route path="/calendar" element={<Calendar doctor={doctor} />} />
        <Route path="/visit" element={<Visit />} />
        <Route path="/view-examinations" element={<ViewExaminations doctor={doctor} />} />
      </Routes>
    </>
  );
}

/**
 * Renders the routes for the laboratory supervisor.
 * @returns {JSX.Element} The JSX element representing the routes for the supervisor.
 */
function SupervisorRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<h1>404-Not found</h1>} />
        <Route path="/test" element={<h1>test</h1>}></Route>
      </Routes>
    </>
  );
}

/**
 * Renders the routes for the laboratory technician.
 * @returns {JSX.Element} The JSX element representing the routes for the technician.
 */
function TechnicianRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<h1>404-Not found</h1>} />
        <Route path="/view-examinations" element={<ViewExaminations doctor={undefined}/>} />
      </Routes>
    </>
  );
}



/**
 * The main component of the application.
 * It handles user authentication and renders the appropriate components based on the user's role.
 * @returns {JsxElement} Component containing application.
 */
export default function App() {
  const [user, setUser] = useState<User>();

  const token = localStorage.getItem("token") as string;

  useEffect(() => {
    if (token != null) {
      const id = Number.parseInt(localStorage.getItem("id") as string);
      const role = localStorage.getItem("role") as string;
      const username = localStorage.getItem("username") as string; 

      id && role && username && setUser({id: id, role: role, username: username});
    }

  }, [])

  return (
    <>
      {user ? (
        user.role === "ADMIN" ? (
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
