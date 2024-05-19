import { Doctor } from "../Model/DoctorModel";
import { getDoctors } from "../Repository/DoctorRepository";

export type DoctorListDispatcher = React.Dispatch<
  React.SetStateAction<Doctor[]>
>

export function fetchDoctorList(doctorListDispatcher: DoctorListDispatcher) {
  getDoctors().then((response) => { doctorListDispatcher(response) })
}

export function fetchAvailableDoctorList(
  date: Date,
  doctorListDispatcher: DoctorListDispatcher
) {
  getDoctors()
    .then((response) => {
      doctorListDispatcher(response.filter((response: any) => 
        response.appointments.every((appointment: {
          registeredDate: Date,
        }) =>
          new Date(appointment.registeredDate).toISOString() !== date.toISOString()
        )
      ))
    });
}