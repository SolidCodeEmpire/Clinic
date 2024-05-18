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
export function fetchAvailableDoctorList(
  date: Date,
  doctorListDispatcher: DoctorListDispatcher
) {

  const filter = (response: any) => {
    return response.appointments.every((appointment: {
      registeredDate: Date,
    }) =>
      new Date(appointment.registeredDate).toISOString() !== date.toISOString()
    )
  };

  fetchFromAPI("/doctors", doctorListDispatcher, {}, {}, filter);
}

export function fetchDoctorList(doctorListDispatcher: DoctorListDispatcher) {
  fetchFromAPI("/doctors", doctorListDispatcher);
}