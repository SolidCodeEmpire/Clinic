import { Appointment } from "../Model/AppointmentModel";
import { getRequest, postRequest } from "./FetchFromApi";

export function getAppointmentById(id: number) {
    return getRequest("/appointment/<:id>", {}, {"id": id});
}

export function addAppointment(appointment: Appointment) {
    return postRequest("/appointment", appointment);
}