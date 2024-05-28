import { Appointment } from "../Model/AppointmentModel";
import { deleteRequest, getRequest, patchRequest, postRequest } from "./FetchFromApi";

function prepareJavaString(date:Date){
    let stringArray = date.toISOString().split("T")
    return (`${stringArray[0]} ${stringArray[1]}`).split(".")[0]
}

export function getAppointments(doctorId:number, startDate: Date, endDate: Date){
    const filter = {doctorId: doctorId, startDate:prepareJavaString(startDate), endDate:prepareJavaString(endDate)}
    return getRequest("/appointments", filter)
}

export function getAppointmentById(id: number) {
    return getRequest("/appointment/<:id>", {}, {"id": id});
}

export function addAppointment(appointment: Appointment) {
    return postRequest("/appointment", appointment);
}

export function deleteAppointment(id: number) {
    return deleteRequest("/appointment/" + id);
}

export function patchAppointment(id: number, visit: Appointment) {
    return patchRequest("/appointment/" + id, visit);
}