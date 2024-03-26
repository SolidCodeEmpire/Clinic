import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css"


type NavbarProps = {
  role: string
}

type RoleDictionary = {
  [role:string] : Permission[];
}

type Permission = {
  name: string,
  url: string,
  iconPath: string
}

export default function Navbar(props: NavbarProps) {
  const functionsDictionary : RoleDictionary = {
    receptionist : [
      { name: "Add patient", url: "add-patient", iconPath:"resources/add-user.png"}, 
      { name: "Deactivate patient", url: "/disable-patient", iconPath:"resources/remove-user.png"},
      { name: "Add visit", url: "/add-visit", iconPath:"resources/add-visit.png"},
      { name: "Calendar", url: "/calendar", iconPath:"resources/calendar.png"}
    ],
    doctor: [

    ],
    lab: [
    
    ],
  }

  return (
    <nav className='navbar'>
      {functionsDictionary[props.role].map((value, index) => {
        return <>
          <Link to={value.url}>
            <div className="navbar-link">
              <img src={value.iconPath} alt={value.name + " icon"} className="navbar-image"></img>
            </div>
          </Link>
        </>
      })}
    </nav>
  )
}