import { Appointment } from "../Model/AppointmentModel";
import { PhysicalExamModel } from "../Model/PhysicalExamModel";
import { getPhysicalExamByAppointment, postPhysicalExam } from "../Repository/PhysicalExamRepository";

export function fetchPhysicalExamsByAppointment(appointment: Appointment, dispatcher: React.Dispatch<React.SetStateAction<PhysicalExamModel[]>>) {
    return getPhysicalExamByAppointment(appointment.id).then((response) => {dispatcher(response); console.log("AAA")});
}

export function submitPhysicalExam(exam: PhysicalExamModel) {
    return postPhysicalExam(exam);
}