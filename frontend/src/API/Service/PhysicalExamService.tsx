import { Appointment } from "../Model/AppointmentModel";
import { PhysicalExamModel } from "../Model/PhysicaExamModel";
import { getPhysicalExamByAppointment } from "../Repository/PhysicalExamRepository";

export function fetchPhysicalExamsByAppointment(appointment: Appointment, dispatcher: React.Dispatch<React.SetStateAction<PhysicalExamModel[]>>) {
    return getPhysicalExamByAppointment(appointment.id).then((response) => {dispatcher(response); console.log("AAA")});
}