import { Doctor } from "../Model/DoctorModel";
import { getDoctors, getDoctorById } from "../Repository/DoctorRepository";

export type DoctorListDispatcher = React.Dispatch<
  React.SetStateAction<Doctor[]>
>
export type DoctorDispatcher = React.Dispatch<
  React.SetStateAction<Doctor | undefined>
>
export function fetchDoctorList(doctorListDispatcher: DoctorListDispatcher) {
  getDoctors().then((response) => { doctorListDispatcher(response) })
}

export function fetchDoctorById(id : number, doctorDispatcher: DoctorDispatcher) {
  getDoctorById(id).then((response) => doctorDispatcher(response));
}