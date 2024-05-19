import { Patient } from "../Model/PatientModel";
import { getRequest, postRequest } from "./FetchFromApi";

export function getPatients(pageNumber: number): Promise<any>;
export function getPatients(ssn: string, firstName: string, lastName: string): Promise<any>;

export function getPatients(arg1: number | string, firstName?: string, lastName?: string): Promise<any> {
    if (typeof arg1 === "number") {
        return getRequest("/patients", { "page": arg1, "pageSize": 20 });
    } else {
        return getRequest("/patients", { "SSN": arg1, "firstName": firstName, "lastName": lastName });
    }
}

export function getPatientById(id: number) {
  return getRequest("/patient/<:id>", {}, {id: id})
}

export function addPatient(patient: Patient) {
  return postRequest("/patient", patient)
}