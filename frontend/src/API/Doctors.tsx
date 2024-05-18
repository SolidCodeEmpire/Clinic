import { fetchFromAPI } from "./FetchFromApi";

export type Doctor = {
  id: number;
  name: string,
  surname: string,
  licenseNumber: string,
  appointments: Array<{
    registeredDate: Date,
  }>
};

export type DoctorListDispatcher = React.Dispatch<
  React.SetStateAction<Doctor[]>
>
export function fetchAvailableDoctorList(date: Date, 
  doctorListDispatcher: DoctorListDispatcher) {

  fetchFromAPI("/doctors", doctorListDispatcher, {}, {}, (response) => {
    return response.appointments.every((appointment : {
      registeredDate: Date,
    }) =>
      !(appointment.registeredDate < date && date < new Date(appointment.registeredDate.getTime() + 30))
    )
  }
  )
    
}

export function fetchDoctorList(doctorListDispatcher: DoctorListDispatcher) {
  fetchFromAPI("/doctors", doctorListDispatcher)
}