import { FetchFromAPI } from "./FetchFromApi";

export type Patient = {
  id: number;
  dateOfBirth: Date;
  insuranceNumber: string;
  middleName: string;
  firstName: string;
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
  dispatcher: React.Dispatch<React.SetStateAction<Patient[]>>
) {
  const fetcher = new FetchFromAPI("/patients");
  fetcher.get(dispatcher, {"page": 0, "pageSize": 20}).then((responseBody) => {console.log(responseBody)})
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
  const fetcher = new FetchFromAPI("/patients");
  fetcher.get(
    patientListDispatcher, 
    {"firstName": firstName, "lastName": lastName, "SSN": ssn}
  )
}

export function fetchPatientById(
  id: number,
  userSetter: React.Dispatch<React.SetStateAction<Patient>>
) {}

export function createEmptyPatient(): Patient {
  return {
    id: 0,
    dateOfBirth: new Date(),
    insuranceNumber: "",
    middleName: "",
    firstName: "",
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
