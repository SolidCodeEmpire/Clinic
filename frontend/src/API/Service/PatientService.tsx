import { Patient } from "../Model/PatientModel";
import { addPatient, getPatientById, getPatients } from "../Repository/PatientRepository";


export type patientListDispatcher = React.Dispatch<
  React.SetStateAction<Patient[]>
>;

export type patientDispatcher = React.Dispatch<
  React.SetStateAction<Patient>
>;

export function fetchPatients(
  dispatcher: patientListDispatcher, 
  pageNumber: number
) {
  getPatients(pageNumber)
    .then((response) => dispatcher(response))
}

export function fetchFilteredPatientList(
  ssn: string,
  firstName: string,
  lastName: string,
  patientListDispatcher: patientListDispatcher
) {
   return getPatients(ssn, firstName, lastName)
    .then((response) => {patientListDispatcher(response)});
}

export function fetchPatientById(
  id: number,
  userSetter: patientDispatcher
) {
    getPatientById(id)
    .then((response) => {userSetter(response)});
}

export function submitPatient(patient : Patient) {
  return addPatient(patient);
} 


