export type ClinicUser = {
  id: number;
  username: string;
  email: string;
  password: string;
  userType: string;
  isActive: boolean;
  roleId: number;
  firstName: string;
  lastName: string;
  licenseNumber: string | undefined;
};

export function createEmptyUser(){
  return {
    id : 0,
    username: "",
    email: "",
    password: "",
    userType: "MEDICAL_REGISTRAR",
    isActive: true,
    roleId: 0,
    firstName: "",
    lastName: "",
    licenseNumber: undefined
  }
}