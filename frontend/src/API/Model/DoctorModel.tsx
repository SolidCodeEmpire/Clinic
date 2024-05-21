import { Appointment } from "./AppointmentModel";

export type Doctor = {
    id: number;
    firstName: string,
    lastName: string,
    licenseNumber: string,
    appointments: Array<Appointment>
  };
  