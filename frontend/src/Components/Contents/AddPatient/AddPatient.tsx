import React, {useState} from 'react';
import "./AddPatient.css";
import PatientForm from '../PatientForm/PatientForm';
import { Patient, submitPatient } from "../../../API/Patients";

export default function AddPatient() {
  const [patient, setPatient] = useState<Patient>()

  function validatePatient(patient: Patient) {
    return true;
  }

  return (
    <>
      <div className="add-patient-container">
        <h1 className="add-patient-header">Insert patient Data</h1>
        <PatientForm patient={patient} disabled={false} patientDispatcher={setPatient}></PatientForm>
        <div className='add-patient-button-div'>
          <button className='add-patient-button' onClick={()=> patient && validatePatient(patient) && submitPatient(patient).then(()=>{
            setPatient(undefined)
            alert("Added user")
          })}>Submit Data</button>
        </div>
      </div>
    </>
  );
}