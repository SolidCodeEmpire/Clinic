import React, {useState} from 'react';
import "./AddPatient.css";
import PatientForm from '../PatientForm/PatientForm';
import { submitPatient } from "../../../API/Service/PatientService";
import { Patient } from '../../../API/Model/PatientModel';

export default function AddPatient() {
  const [patient, setPatient] = useState<Patient>()

  /**
   * Check if non-null values in database are defined 
   * and assure that given ssn, insurence and phone number are correct (number of digits).
   * 
   * @param patient 
   * @returns 
   */
  function validatePatient(patient: Patient) {
    if(+patient.socialSecurityNumber < 100000000 || +patient.socialSecurityNumber > 999999999 || patient.insuranceNumber === undefined
        || +patient.insuranceNumber < 100000000  || +patient.insuranceNumber > 999999999      || patient.insuranceNumber === undefined
        || +patient.phoneNumber < 100000000      || +patient.phoneNumber > 999999999          || patient.phoneNumber === undefined
        || (patient.firstName
        && patient.lastName 
        && patient.sex 
        && patient.dateOfBirth  
        && patient.address.street 
        && patient.address.houseNumber  
        && patient.address.city  
        && patient.address.postalCode  
        && patient.address.country)) 
      return false;
    else 
      return true;
  }

  return (
    <>
      <div className="add-patient-container">
        <h1 className="add-patient-header">Insert patient Data</h1>
        <PatientForm patient={patient} disabled={false} patientDispatcher={setPatient}></PatientForm>
        <div className='add-patient-button-div'>
          <button className='primary-button' onClick={()=>{
            if(window.confirm("Are you sure you want to add new patient?")){
              if(patient && validatePatient(patient)){
                submitPatient(patient)
                setPatient(undefined)
                alert("New patient added successfully.")
              } 
              else{
                alert("Adding new patient failed. Check input data.")
              }
            }
          }}>Submit Data</button>
        </div>
      </div>
    </>
  );
}