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