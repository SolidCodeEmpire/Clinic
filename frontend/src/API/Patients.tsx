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
  dispatcher(patientList.reverse());
}

const patientList = [
  {
    id: 1,
    dateOfBirth: new Date(2002, 10, 10),
    insuranceNumber: "111000111",
    middleName: "Adam",
    firstName: "Jarosław",
    phoneNumber: "123-456-789",
    placeOfBirth: "Katowice",
    sex: "MALE",
    socialSecurityNumber: "1020213213",
    surname: "Adamski",
    address: {
      id: 1,
      apartmentNumber: 24,
      city: "Katowice",
      country: "Poland",
      houseNumber: "11A",
      postalCode: "40-123",
      street: "Glowna",
    },
  },
  {
    id: 2,
    dateOfBirth: new Date(2002, 10, 10),
    insuranceNumber: "111000111",
    middleName: "Adam",
    firstName: "Andrzej",
    phoneNumber: "223-456-789",
    placeOfBirth: "Katowice",
    sex: "MALE",
    socialSecurityNumber: "1020213213",
    surname: "Adamski",
    address: {
      id: 1,
      apartmentNumber: 24,
      city: "Katowice",
      country: "Poland",
      houseNumber: "11A",
      postalCode: "40-123",
      street: "Glowna",
    },
  },
  {
    id: 3,
    dateOfBirth: new Date(2002, 10, 10),
    insuranceNumber: "111000111",
    middleName: "Adam",
    firstName: "Zbigniew",
    phoneNumber: "323-456-789",
    placeOfBirth: "Katowice",
    sex: "MALE",
    socialSecurityNumber: "1020213213",
    surname: "Adamski",
    address: {
      id: 1,
      apartmentNumber: 24,
      city: "Katowice",
      country: "Poland",
      houseNumber: "11A",
      postalCode: "40-123",
      street: "Glowna",
    },
  },
  {
    id: 4,
    dateOfBirth: new Date(2002, 10, 10),
    insuranceNumber: "111000111",
    middleName: "Adam",
    firstName: "Szymon",
    phoneNumber: "423-456-789",
    placeOfBirth: "Katowice",
    sex: "MALE",
    socialSecurityNumber: "1020213213",
    surname: "Adamski",
    address: {
      id: 1,
      apartmentNumber: 24,
      city: "Katowice",
      country: "Poland",
      houseNumber: "11A",
      postalCode: "40-123",
      street: "Glowna",
    },
  },
  {
    id: 5,
    dateOfBirth: new Date(2002, 10, 10),
    insuranceNumber: "111000111",
    middleName: "Adam",
    firstName: "Mateusz",
    phoneNumber: "523-456-789",
    placeOfBirth: "Katowice",
    sex: "MALE",
    socialSecurityNumber: "1020213213",
    surname: "Adamski",
    address: {
      id: 1,
      apartmentNumber: 24,
      city: "Katowice",
      country: "Poland",
      houseNumber: "11A",
      postalCode: "40-123",
      street: "Glowna",
    },
  },
  {
    id: 6,
    dateOfBirth: new Date(2002, 10, 10),
    insuranceNumber: "111000111",
    middleName: "Adam",
    firstName: "Rafał",
    phoneNumber: "623-456-789",
    placeOfBirth: "Katowice",
    sex: "MALE",
    socialSecurityNumber: "1020213213",
    surname: "Adamski",
    address: {
      id: 1,
      apartmentNumber: 24,
      city: "Katowice",
      country: "Poland",
      houseNumber: "11A",
      postalCode: "40-123",
      street: "Glowna",
    },
  },
  {
    id: 7,
    dateOfBirth: new Date(2002, 10, 10),
    insuranceNumber: "111000111",
    middleName: "Adam",
    firstName: "Jarosław",
    phoneNumber: "123-456-789",
    placeOfBirth: "Katowice",
    sex: "MALE",
    socialSecurityNumber: "1020213213",
    surname: "Adamski",
    address: {
      id: 1,
      apartmentNumber: 24,
      city: "Katowice",
      country: "Poland",
      houseNumber: "11A",
      postalCode: "40-123",
      street: "Glowna",
    },
  },
  {
    id: 8,
    dateOfBirth: new Date(2002, 10, 10),
    insuranceNumber: "111000111",
    middleName: "Adam",
    firstName: "Jarosław",
    phoneNumber: "123-456-789",
    placeOfBirth: "Katowice",
    sex: "MALE",
    socialSecurityNumber: "1020213213",
    surname: "Adamski",
    address: {
      id: 1,
      apartmentNumber: 24,
      city: "Katowice",
      country: "Poland",
      houseNumber: "11A",
      postalCode: "40-123",
      street: "Glowna",
    },
  },
  {
    id: 9,
    dateOfBirth: new Date(2002, 10, 10),
    insuranceNumber: "111000111",
    middleName: "Adam",
    firstName: "Jarosław",
    phoneNumber: "123-456-789",
    placeOfBirth: "Katowice",
    sex: "MALE",
    socialSecurityNumber: "1020213213",
    surname: "Adamski",
    address: {
      id: 1,
      apartmentNumber: 24,
      city: "Katowice",
      country: "Poland",
      houseNumber: "11A",
      postalCode: "40-123",
      street: "Glowna",
    },
  },
  {
    id: 10,
    dateOfBirth: new Date(2002, 10, 10),
    insuranceNumber: "111000111",
    middleName: "Adam",
    firstName: "Jarosław",
    phoneNumber: "123-456-789",
    placeOfBirth: "Katowice",
    sex: "MALE",
    socialSecurityNumber: "1020213213",
    surname: "Adamski",
    address: {
      id: 1,
      apartmentNumber: 24,
      city: "Katowice",
      country: "Poland",
      houseNumber: "11A",
      postalCode: "40-123",
      street: "Glowna",
    },
  },
  {
    id: 11,
    dateOfBirth: new Date(2002, 10, 10),
    insuranceNumber: "111000111",
    middleName: "Adam",
    firstName: "Jarosław",
    phoneNumber: "123-456-789",
    placeOfBirth: "Katowice",
    sex: "MALE",
    socialSecurityNumber: "1020213213",
    surname: "Adamski",
    address: {
      id: 1,
      apartmentNumber: 24,
      city: "Katowice",
      country: "Poland",
      houseNumber: "11A",
      postalCode: "40-123",
      street: "Glowna",
    },
  },
  {
    id: 12,
    dateOfBirth: new Date(2002, 10, 10),
    insuranceNumber: "111000111",
    middleName: "Adam",
    firstName: "Jarosław",
    phoneNumber: "123-456-789",
    placeOfBirth: "Katowice",
    sex: "MALE",
    socialSecurityNumber: "1020213213",
    surname: "Adamski",
    address: {
      id: 1,
      apartmentNumber: 24,
      city: "Katowice",
      country: "Poland",
      houseNumber: "11A",
      postalCode: "40-123",
      street: "Glowna",
    },
  },
  {
    id: 13,
    dateOfBirth: new Date(2002, 10, 10),
    insuranceNumber: "111000111",
    middleName: "Adam",
    firstName: "Jarosław",
    phoneNumber: "123-456-789",
    placeOfBirth: "Katowice",
    sex: "MALE",
    socialSecurityNumber: "1020213213",
    surname: "Adamski",
    address: {
      id: 1,
      apartmentNumber: 24,
      city: "Katowice",
      country: "Poland",
      houseNumber: "11A",
      postalCode: "40-123",
      street: "Glowna",
    },
  },
  {
    id: 14,
    dateOfBirth: new Date(2002, 10, 10),
    insuranceNumber: "111000111",
    middleName: "Adam",
    firstName: "Jarosław",
    phoneNumber: "123-456-789",
    placeOfBirth: "Katowice",
    sex: "MALE",
    socialSecurityNumber: "1020213213",
    surname: "Adamski",
    address: {
      id: 1,
      apartmentNumber: 24,
      city: "Katowice",
      country: "Poland",
      houseNumber: "11A",
      postalCode: "40-123",
      street: "Glowna",
    },
  },
  {
    id: 14,
    dateOfBirth: new Date(2002, 10, 10),
    insuranceNumber: "111000111",
    middleName: "Adam",
    firstName: "Jarosław",
    phoneNumber: "123-456-789",
    placeOfBirth: "Katowice",
    sex: "MALE",
    socialSecurityNumber: "1020213213",
    surname: "Adamski",
    address: {
      id: 1,
      apartmentNumber: 24,
      city: "Katowice",
      country: "Poland",
      houseNumber: "11A",
      postalCode: "40-123",
      street: "Glowna",
    },
  },
  {
    id: 15,
    dateOfBirth: new Date(2002, 10, 10),
    insuranceNumber: "111000111",
    middleName: "Adam",
    firstName: "Jarosław",
    phoneNumber: "123-456-789",
    placeOfBirth: "Katowice",
    sex: "MALE",
    socialSecurityNumber: "1020213213",
    surname: "Adamski",
    address: {
      id: 1,
      apartmentNumber: 24,
      city: "Katowice",
      country: "Poland",
      houseNumber: "11A",
      postalCode: "40-123",
      street: "Glowna",
    },
  },
  {
    id: 16,
    dateOfBirth: new Date(2002, 10, 10),
    insuranceNumber: "111000111",
    middleName: "Adam",
    firstName: "Jarosław",
    phoneNumber: "123-456-789",
    placeOfBirth: "Katowice",
    sex: "MALE",
    socialSecurityNumber: "1020213213",
    surname: "Adamski",
    address: {
      id: 1,
      apartmentNumber: 24,
      city: "Katowice",
      country: "Poland",
      houseNumber: "11A",
      postalCode: "40-123",
      street: "Glowna",
    },
  },
  {
    id: 17,
    dateOfBirth: new Date(2002, 10, 10),
    insuranceNumber: "111000111",
    middleName: "Adam",
    firstName: "Jarosław",
    phoneNumber: "123-456-789",
    placeOfBirth: "Katowice",
    sex: "MALE",
    socialSecurityNumber: "1020213213",
    surname: "Adamski",
    address: {
      id: 1,
      apartmentNumber: 24,
      city: "Katowice",
      country: "Poland",
      houseNumber: "11A",
      postalCode: "40-123",
      street: "Glowna",
    },
  },
  {
    id: 18,
    dateOfBirth: new Date(2002, 10, 10),
    insuranceNumber: "111000111",
    middleName: "Adam",
    firstName: "Jarosław",
    phoneNumber: "123-456-789",
    placeOfBirth: "Katowice",
    sex: "MALE",
    socialSecurityNumber: "1020213213",
    surname: "Adamski",
    address: {
      id: 1,
      apartmentNumber: 24,
      city: "Katowice",
      country: "Poland",
      houseNumber: "11A",
      postalCode: "40-123",
      street: "Glowna",
    },
  },
  {
    id: 19,
    dateOfBirth: new Date(2002, 10, 10),
    insuranceNumber: "111000111",
    middleName: "Adam",
    firstName: "Jarosław",
    phoneNumber: "123-456-789",
    placeOfBirth: "Katowice",
    sex: "MALE",
    socialSecurityNumber: "1020213213",
    surname: "Adamski",
    address: {
      id: 1,
      apartmentNumber: 24,
      city: "Katowice",
      country: "Poland",
      houseNumber: "11A",
      postalCode: "40-123",
      street: "Glowna",
    },
  },
  {
    id: 20,
    dateOfBirth: new Date(2002, 10, 10),
    insuranceNumber: "111000111",
    middleName: "Adam",
    firstName: "Jarosław",
    phoneNumber: "123-456-789",
    placeOfBirth: "Katowice",
    sex: "MALE",
    socialSecurityNumber: "1020213213",
    surname: "Adamski",
    address: {
      id: 1,
      apartmentNumber: 24,
      city: "Katowice",
      country: "Poland",
      houseNumber: "11A",
      postalCode: "40-123",
      street: "Glowna",
    },
  },
];

export type patientListDispatcher = React.Dispatch<
  React.SetStateAction<Patient[]>
>;

export function fetchFilteredPatientList(
  ssn: string,
  firstName: string,
  lastName: string,
  patientListDispatcher: patientListDispatcher
) {
  patientListDispatcher(
    patientList.filter((value) => 
      value.firstName.toLowerCase().includes(firstName.toLowerCase()) &&
        value.surname.toLowerCase().includes(lastName.toLowerCase()) &&
        value.socialSecurityNumber.toLowerCase().includes(ssn.toLowerCase())
    )
  );
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
