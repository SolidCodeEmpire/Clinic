import React, { useEffect, useState } from "react";
import {Popup} from 'reactjs-popup'

import './ViewPatients.css'
import { Patient, fetchPatients } from "../../../API/Patients";


type PatientDispatcher = React.Dispatch<React.SetStateAction<Patient | undefined>>

export default function ViewPatients() {
  const [currentPage, setCurrentPage] = useState(1);
  const [patients, setPatients] = useState<Array<Patient>>([]);
  const [chosenPatient, setChosenPatient] = useState<Patient>();

  useEffect(() => {
    fetchPatients(setPatients)
  }, [])

  return (
    <div className="patients">
      <Popup open={chosenPatient !== undefined} closeOnDocumentClick onClose={() => {setChosenPatient(undefined)}}>
        {chosenPatient && openPatientDetailsPopup(chosenPatient, setChosenPatient)}
      </Popup>

      <div className="table-navigation">
        <form className="page-navigation">
          <button type="button" onClick={() => setCurrentPage(currentPage - 1)}>{"<"}</button>
          <input type="text" placeholder={`${currentPage}`} onChange={(event) => console.log(event.target.value)} />
          <button type="button" onClick={() => setCurrentPage(currentPage + 1)}>{">"}</button>
          <button type="button">filter</button>
        </form>
        <form className="find-patient">
          <input type="text" placeholder="Find patient" />
          <button>Find</button>
        </form>
      </div>
      <div>
        {patientTable(patients, setChosenPatient)}
      </div>
    </div>
  )
}

function patientTable(patients: Patient[], patientDispatcher: PatientDispatcher) {
  return (
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
            <tr key={id.toString()} 
                className={
                  `patients-table-row ${id % 2 === 0 && 'row-odd'} clickable-row`
              }
              onClick={() => patientDispatcher(patients[id])}
            >
              <td>{value.id}</td>
              <td>{value.socialSecurityNumber}</td>
              <td>{value.surname}</td>
              <td>{value.firstName}</td>
              <td>{value.middleName}</td>
              <td>{value.sex}</td>
              <td>{value.phoneNumber}</td>
              <td>{value.dateOfBirth.toISOString().split('T')[0]}</td>
              <td>{value.placeOfBirth}</td>
              <td>In details</td>
              <td>{value.insuranceNumber}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}


function openPatientDetailsPopup(patient: Patient, patientDispatcher: PatientDispatcher) {
  return <>
    <h1>{patient.firstName}</h1>
    <button onClick={() => {patientDispatcher(undefined)}}>Close</button>
  </>
}
