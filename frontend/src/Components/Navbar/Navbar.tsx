import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css"
import ToggleTheme from '../ToggleTheme/ToggleTheme';


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
      { name: "Add patient", url: "add-patient", iconPath: "resources/add-user.png"}, 
      { name: "Deactivate patient", url: "/disable-patient", iconPath: "resources/remove-user.png"},
      { name: "Add visit", url: "/add-visit", iconPath: "resources/add-visit.png"},
      { name: "Calendar", url: "/calendar", iconPath: "resources/calendar.png"}
    ],
    doctor: [

    ],
    lab: [
    
    ],
  }

  const [currentCheckedItem, setCurrentCheckedItem] = useState<Permission>() 
  return (
    <nav className='navbar'>
      {functionsDictionary[props.role].map((value, index) => {
        return <>
          <Link to={value.url} onClick={() => { setCurrentCheckedItem(value); }}>
            <div className={
                      `navbar-link 
                      ${value.name === currentCheckedItem?.name && "navbar-item-checked"}`
                 }
            >
              <img src={value.iconPath} 
                   alt={value.name + " icon"} 
                   aria-label={value.name} 
                   className={
                    `navbar-image 
                    ${value.name === currentCheckedItem?.name && "navbar-img-checked"}`
                  } 
              />
            </div>
          </Link>
        </>
      })}
      <div className='flex-end-self'>
        <ToggleTheme></ToggleTheme>
      </div>
    </nav>
  )
}