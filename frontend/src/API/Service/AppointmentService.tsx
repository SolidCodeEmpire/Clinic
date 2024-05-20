import { Doctor } from "../Model/DoctorModel";
import { Patient } from "../Model/PatientModel";
import { addAppointment } from "../Repository/AppointmentRepository";

export function submitAppointment(patient: Patient, doctor: Doctor, date: Date, description: string) {
    let appointment = {
        id: 0,
        description: description, 
        diagnosis: "NOT YET", 
        status: "REGISTERED",
        patientId: patient.id, 
        doctorId: doctor.id, 
        registeredDate: date, 
        finishedDate: undefined, 
        medicalRegistrarId: 1

    }
    addAppointment(appointment).then(() => {window.location.href = '/'});
}