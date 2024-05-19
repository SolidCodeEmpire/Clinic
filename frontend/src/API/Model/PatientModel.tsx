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
  address: Address;
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