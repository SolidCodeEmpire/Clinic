import { editableInputTypes } from "@testing-library/user-event/dist/utils";
import { Appointment } from "../Model/AppointmentModel";
import { Doctor } from "../Model/DoctorModel";
import { Patient } from "../Model/PatientModel";
import {
  addAppointment,
  deleteAppointment,
  getAppointmentById,
  getAppointments,
  patchAppointment,
} from "../Repository/AppointmentRepository";
import { SetStateAction } from "jotai";

export function submitAppointment(
  patient: Patient,
  doctor: Doctor,
  date: Date,
  description: string
) {
  let appointment = {
    id: 0,
    description: description,
    diagnosis: "NOT YET",
    status: "REGISTERED",
    patientId: patient.id,
    patientFirstName: patient.firstName, 
    patientLastName: patient.lastName,
    doctorId: doctor.id,
    visitDate: date,
    finishedDate: undefined,
    medicalRegistrarId: 1,
  };
  addAppointment(appointment).then(() => {
    window.location.href = "/calendar";
  });
}

export function cancelAppointment(id: number) {
  return deleteAppointment(id);
}

export function fetchAppointments(
  doctorId: number,
  startDate: Date,
  endDate: Date,
  setAppointments: React.Dispatch<
    React.SetStateAction<Appointment[] | undefined>
  >
) {
  getAppointments(doctorId, startDate, endDate).then((response) => {
    setAppointments(response);
  });
}

export function updateAppointment(visit : Appointment) {
  return patchAppointment(visit.id, visit);
}

export function fetchAppointmentById(id: number, dispatcher: any) {
  return getAppointmentById(id).then((response) => dispatcher(response));
}