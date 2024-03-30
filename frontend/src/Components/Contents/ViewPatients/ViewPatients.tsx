import React, { useEffect, useState } from "react";

import './ViewPatients.css'
import { Patient, fetchPatients } from "../../../API/Patients";

export default function ViewPatients() {
  const [currentPage, setCurrentPage] = useState(1);
  const [patients, setPatients] = useState<Array<Patient>>([]);
  
  useEffect(() => {
    fetchPatients(setPatients)
  }, [])

  return (<div className="patients">
    <div className="table-navigation">
      <form className="page-navigation">
        <button type="button" onClick={() => setCurrentPage(currentPage - 1)}>{"<"}</button>
        <input type="text" placeholder={`${currentPage}`} onChange={(event) => console.log(event.target.value)} />
        <button type="button" onClick={() => setCurrentPage(currentPage + 1)}>{">"}</button>
      </form>
      <form className="find-patient">
        <input type="text" placeholder="Find patient" />
        <button>Find</button>
      </form>
    </div>
    <div>
      <table className="patients-table">
        <tbody>
          <tr>
            <th>ID</th>
            <th>SSN</th>
            <th>Last name</th>
            <th>First name</th>
            <th>Middle name</th>
            <th>Sex</th>
            <th>Phone number</th>
            <th>Date of birth</th>
            <th>Place of birth</th>
            <th>Address</th>
            <th>Insurance number</th>
          </tr>
          {patients.map((value, id) => {
            return (
              <tr key={id.toString()} className={`patients-table-row ${id % 2 === 0 && 'row-odd'}`}>
                <td><button className="table-button">{value.id}</button></td>
                <td>{value.socialSecurityNumber}</td>
                <td>{value.surname}</td>
                <td>{value.firstName}</td>
                <td>{value.middleName}</td>
                <td>{value.sex}</td>
                <td>{value.phoneNumber}</td>
                <td>{value.dateOfBirth.toISOString()}</td>
                <td>{value.placeOfBirth}</td>
                <td><button className="table-button" onClick={() => alert(value.address)}>View address</button></td>
                <td>{value.insuranceNumber}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  </div>
  )
}