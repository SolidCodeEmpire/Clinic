import React from 'react';


type NavbarProps = {
  role: string
}

type RoleDictionary = {
  [role:string] : Permission[];
}

type Permission = {
  url: string,
  iconPath: string
}

export default function Navbar(props: NavbarProps) {
  const functionsDictionary : RoleDictionary = {
    receptionist : [{ url: '\\add-user', iconPath:"\.png"}],
    doctor: [{url:'\\kill-patient', iconPath:"cross"}],
    lab: [{url:'\\kill-patient', iconPath:"cross"}],
  }

  console.log(functionsDictionary[props.role]);
  return (
    <nav className='navbar'>
      {functionsDictionary[props.role].map((value, index) => {
        return <><p>{value.url}</p></>
      })}
    </nav>
  )
}