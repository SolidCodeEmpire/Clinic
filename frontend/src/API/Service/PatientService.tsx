import { Patient } from "../Model/PatientModel";
import { addPatient, getPatientById, getPatients, changePatient } from "../Repository/PatientRepository";


export type PatientListDispatcher = React.Dispatch<
  React.SetStateAction<Patient[]>
>;

export type PatientDispatcher = React.Dispatch<
  React.SetStateAction<Patient | undefined>
>;

export function fetchPatients(
  dispatcher: PatientListDispatcher, 
  pageNumber: number
) {
  getPatients(pageNumber)
    .then((response) => dispatcher(response))
}

export function fetchFilteredPatientList(
  ssn: string,
  firstName: string,
  lastName: string,
  patientListDispatcher: PatientListDispatcher
) {
   return getPatients(ssn, firstName, lastName)
    .then((response) => {patientListDispatcher(response)});
}

export function fetchPatientById(
  id: number,
  userSetter: PatientDispatcher
) {
    getPatientById(id)
    .then((response) => {userSetter(response)});
}

export function submitPatient(patient : Patient) {
  return addPatient(patient);
}

export function updatePatient(id: number, patient: Patient){
  return changePatient(id, patient)
}


