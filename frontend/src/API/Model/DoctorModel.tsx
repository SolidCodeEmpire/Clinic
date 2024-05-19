export type Doctor = {
    id: number;
    name: string,
    surname: string,
    licenseNumber: string,
    appointments: Array<{
      registeredDate: Date,
    }>
  };
  