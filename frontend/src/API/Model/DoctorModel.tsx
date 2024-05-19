export type Doctor = {
    id: number;
    firstName: string,
    lastName: string,
    licenseNumber: string,
    appointments: Array<{
      registeredDate: Date,
    }>
  };
  