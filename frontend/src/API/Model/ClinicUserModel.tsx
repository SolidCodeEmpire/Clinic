export type ClinicUser = {
  id: number;
  firstName: string;
  lastName: string;
  clinicUser: LoginData;
};

type LoginData = {
  username: string;
  email: string;
  password: string;
  userType: string;
  isActive: boolean;
};
