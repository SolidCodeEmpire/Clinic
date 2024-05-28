import { Appointment } from "../Model/AppointmentModel";
import { PhysicalExamModel } from "../Model/PhysicalExamModel";
import { getRequest, postRequest } from "./FetchFromApi";

export function getPhysicalExamByAppointment(appointmentId: number){
    return getRequest("/physical_examinations", {appointmentId: appointmentId});
}

export function postPhysicalExam(exam: PhysicalExamModel) {
    return postRequest("/physical_examination", exam);
}