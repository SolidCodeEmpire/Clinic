export type Patient = {
    id: number,
    dateOfBirth: Date,
    insuranceNumber: string,
    middleName: string,
    firstName: string,
    phoneNumber: string,
    placeOfBirth: string,
    sex: string,
    socialSecurityNumber: string,
    surname: string,
    address: {
      id: number,
      apartment_number: number,
      city: string,
      country: string,
      houseNumber: string,
      postalCode: string,
      street: string
    }
}

export function mockFetchPatients(dispatcher: React.Dispatch<React.SetStateAction<Patient[]>>) {

}


export function fetchPatients(dispatcher: React.Dispatch<React.SetStateAction<Patient[]>>) {
  var patients = [{
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
      apartment_number: 24,
      city: "Katowice",
      country: "Poland",
      houseNumber: "11A",
      postalCode: "40-123",
      street: "Glowna"
    }
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
      apartment_number: 24,
      city: "Katowice",
      country: "Poland",
      houseNumber: "11A",
      postalCode: "40-123",
      street: "Glowna"
    }
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
      apartment_number: 24,
      city: "Katowice",
      country: "Poland",
      houseNumber: "11A",
      postalCode: "40-123",
      street: "Glowna"
    }
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
      apartment_number: 24,
      city: "Katowice",
      country: "Poland",
      houseNumber: "11A",
      postalCode: "40-123",
      street: "Glowna"
    }
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
      apartment_number: 24,
      city: "Katowice",
      country: "Poland",
      houseNumber: "11A",
      postalCode: "40-123",
      street: "Glowna"
    }
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
      apartment_number: 24,
      city: "Katowice",
      country: "Poland",
      houseNumber: "11A",
      postalCode: "40-123",
      street: "Glowna"
    }
  }]

  dispatcher(patients);
}

export function fetchPatientById(id: number, userSetter: React.Dispatch<React.SetStateAction<Patient>>) {

}
