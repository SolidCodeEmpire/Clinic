import { getRequest } from "./FetchFromApi";

export function getClinicUsersReceptionist() {
  return getRequest("/admin/medical_registrars");
}

export function getClinicUsersDoctor() {
  return getRequest("/admin/doctors");
}

export function getClinicUsersTechnician() {
  return getRequest("/admin/lab_technicians");
}

export function getClinicUsersSupervisor() {
  return getRequest("/admin/lab_supervisors");
}
