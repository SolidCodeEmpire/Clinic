import { Patient } from "../Model/PatientModel";
import { getRequest, postRequest, patchRequest, deleteRequest } from "./FetchFromApi";

export function getPatients(pageNumber: number): Promise<any>;
export function getPatients(ssn: string, firstName: string, lastName: string): Promise<any>;

export function getPatients(arg1: number | string, firstName?: string, lastName?: string): Promise<any> {
    if (typeof arg1 === "number") {
        return getRequest("/patients", { "page": arg1, "pageSize": 20 });
    } else {
        let filter = {}
        if (arg1 !== "") {
          filter = {...filter, "socialSecurityNumber" : arg1} 
        }

        if (firstName !== "") {
          filter = {...filter, "firstName" : firstName} 
        }

        if (lastName !== "" ) {
          filter = {...filter, "lastName" : lastName }
        }
        return getRequest("/patient/filter", filter);
    }
}

export function getPatientById(id: number) {
  return getRequest("/patient/<:id>", {}, {id:id})
}

export function addPatient(patient: Patient) {
  return postRequest("/patient", patient)
}

export function changePatient(id: number, patient: Patient){
  return patchRequest("/patient/" + id, patient)
}

export function deactivatePatient(id:number){
  return deleteRequest("/patient/" + id)
}