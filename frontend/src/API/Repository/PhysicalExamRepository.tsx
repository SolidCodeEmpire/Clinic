import { Appointment } from "../Model/AppointmentModel";
import { getRequest } from "./FetchFromApi";

export function getPhysicalExamByAppointment(appointmentId: number){
    return getRequest("/physical_examinations");
}