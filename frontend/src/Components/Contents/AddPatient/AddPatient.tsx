import React, {useState} from 'react';
import "./AddPatient.css";
import PatientForm from '../PatientForm/PatientForm';
import { Patient } from "../../../API/Patients";

export default function AddPatient() {
  const [patient, setPatient] = useState<Patient>()

  return (
    <>
      <div className="add-patient-container">
        <h1 className="add-patient-header">Insert patient Data</h1>
        <PatientForm patient={patient} disabled={false} patientDispatcher={setPatient}></PatientForm>
        <div className='add-patient-button-div'>
          <button className='add-patient-button' onClick={()=> console.log(patient)}>Submit Data</button>
        </div>
      </div>
    </>
  );
}