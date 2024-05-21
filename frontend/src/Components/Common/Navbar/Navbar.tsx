import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css"
import ToggleTheme from '../ToggleTheme/ToggleTheme';


type NavbarProps = {
  role: string
}

type RoleDictionary = {
  [role: string]: Permission[];
}

type Permission = {
  name: string,
  url: string,
  iconPath: string
}

/**
 * Renders the navigation bar component.
 * 
 * @param props - The props for the Navbar component.
 * @returns The rendered Navbar component.
 */
export default function Navbar(props: NavbarProps) {
  const functionsDictionary: RoleDictionary = {
    receptionist: [
      { name: "Add patient", url: "add-patient", iconPath: "resources/add-user.png" },
      { name: "View patients", url: "/view-patients", iconPath: "resources/view-users.png" },
      { name: "Calendar", url: "/calendar", iconPath: "resources/calendar.png" }
    ],
    doctor: [
      {name: "Calendar", url: "/calendar", iconPath: "resources/calendar.png"},
      {name: "View examinations", url: "/view-examinations", iconPath: "resources/add-visit.png"}
    ],
    supervisor: [

    ],
    technician: [

    ],
  }

  const [currentCheckedItem, setCurrentCheckedItem] = useState<Permission>()
  return (
    <nav className='navbar'>
      {functionsDictionary[props.role].map((value, index) => {
        return <div key={index}>
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
        </div>
      })}
      <div className='flex-end-self'>
        <ToggleTheme></ToggleTheme>
      </div>
    </nav>
  )
}