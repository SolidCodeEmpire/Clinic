import exp from "constants";
import { fetchFromAPI, submitToAPI } from "./FetchFromApi";

export type Patient = {
  id: number;
  dateOfBirth: Date;
  insuranceNumber: string;
  middleName: string;
  name: string;
  phoneNumber: string;
  placeOfBirth: string;
  sex: string;
  socialSecurityNumber: string;
  surname: string;
  address: {
    id: number;
    apartmentNumber: number;
    city: string;
    country: string;
    houseNumber: string;
    postalCode: string;
    street: string;
  };
};

export type Address = {
  id: number;
  apartmentNumber: number;
  city: string;
  country: string;
  houseNumber: string;
  postalCode: string;
  street: string;
};

export function fetchPatients(
  dispatcher: React.Dispatch<React.SetStateAction<Patient[]>>, 
  pageNumber: number
) {
  fetchFromAPI("/patients", dispatcher, {"page": pageNumber, "pageSize": 20})
}

export type patientListDispatcher = React.Dispatch<
  React.SetStateAction<Patient[]>
>;

export function fetchFilteredPatientList(
  ssn: string,
  firstName: string,
  lastName: string,
  patientListDispatcher: patientListDispatcher
) {
   return fetchFromAPI(
    "/patients",
    patientListDispatcher, 
    {"firstName": firstName, "lastName": lastName, "SSN": ssn}
  )
}

export function fetchPatientById(
  id: number,
  userSetter: React.Dispatch<React.SetStateAction<Patient>>
) {
  return fetchFromAPI("/patient/<:id>", userSetter, {}, {id: id})
}

export function submitPatient(patient : Patient) {
  return submitToAPI(
    "/patient",
    patient
  )
} 

export function createEmptyPatient(): Patient {
  return {
    id: 0,
    dateOfBirth: new Date(),
    insuranceNumber: "",
    middleName: "",
    name: "",
    phoneNumber: "",
    placeOfBirth: "",
    sex: "MALE",
    socialSecurityNumber: "",
    surname: "",
    address: {
      id: 0,
      apartmentNumber: 0,
      city: "",
      country: "",
      houseNumber: "",
      postalCode: "",
      street: "",
    },
  };
}
