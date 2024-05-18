import React, { useEffect, useState } from "react";
import { Popup } from 'reactjs-popup'

import './ViewPatients.css'
import { Patient, fetchPatients } from "../../../API/Patients";
import PatientForm from "../PatientForm/PatientForm";


export type PatientDispatcher = React.Dispatch<React.SetStateAction<Patient | undefined>>
export type PatientsListDispatcher = React.Dispatch<React.SetStateAction<Patient[]>>


export default function ViewPatients() {
  const [currentPage, setCurrentPage] = useState(1);
  const [patients, setPatients] = useState<Array<Patient>>([]);
  const [chosenPatient, setChosenPatient] = useState<Patient>();

  useEffect(() => {
    fetchPatients(setPatients, currentPage - 1)
  }, [currentPage])

  return (
    <div className="patients">
      <Popup open={chosenPatient !== undefined} closeOnDocumentClick
        onClose={() => { //todo 
          setChosenPatient(undefined)
        }}>
        {chosenPatient && <PatientDetailsPopup
          patient={chosenPatient}
          patientDispatcher={setChosenPatient}
          patientsList={patients}
          patientsListDispatcher={setPatients}
        />}
      </Popup>

      <div className="table-navigation">
        <form className="page-navigation">
          <button className="arrow-button" type="button" onClick={() => setCurrentPage(currentPage === 1 ? currentPage : currentPage - 1)}>{"<"}</button>
          <input type="number" min={1} value={`${currentPage}`} onChange={(event) => setCurrentPage(Number(event.target.value))} title="Page Number" placeholder="Page Number" />
          <button className="arrow-button" type="button" onClick={() => setCurrentPage(currentPage + 1)}>{">"}</button>
          <button type="button">Filter</button>
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
              <td className="id-column">{value.id}</td>
              <td>{value.socialSecurityNumber}</td>
              <td>{value.surname}</td>
              <td>{value.name}</td>
              <td>{value.middleName}</td>
              <td>{value.sex}</td>
              <td>{value.phoneNumber}</td>
              <td>{new Date(value.dateOfBirth).toISOString().split('T')[0]}</td>
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

type PatientPopupProps = {
  patient: Patient
  patientDispatcher: PatientDispatcher
  patientsList: Patient[]
  patientsListDispatcher: PatientsListDispatcher
}

function PatientDetailsPopup(props: PatientPopupProps) {
  const [isDisabled, setDisabled] = useState(true);
  return (<>
    <div className="edit-button-wrapper">
      <button className={`edit-button add-patient-button ${isDisabled ? 'off' : 'on'}`}
        onClick={() => setDisabled(currentValue => !currentValue)}>
        Edit
      </button>
    </div>

    <PatientForm patient={props.patient} disabled={isDisabled} patientDispatcher={props.patientDispatcher}></PatientForm>

    <div className='add-patient-button-div'>
      <button className='patient-popup-button' onClick={() => {
        // to do
        props.patientDispatcher(undefined)
      }}>Discard changes</button>

      <button className='patient-popup-button' onClick={() => {
        props.patientsListDispatcher(props.patientsList.map((value, id) => value.id === props.patient.id ? props.patient : value))
        props.patientDispatcher(undefined)
      }}>Save changes</button>
    </div>
  </>)
}
