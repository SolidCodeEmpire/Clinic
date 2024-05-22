export type ClinicUser = {
  userId: number;
  username: string;
  email: string;
  password: string;
  userType: string;
  isActive: boolean;
  id: number;
  firstName: string;
  lastName: string;
  licenseNumber: string | undefined;
};