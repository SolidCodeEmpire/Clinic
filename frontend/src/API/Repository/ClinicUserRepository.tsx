import { ClinicUser } from "../Model/ClinicUserModel";
import { deleteRequest, getRequest, patchRequest } from "./FetchFromApi";

export function getClinicUsers() {
  return getRequest("/admin/users");
}

export function deactivateClinicUser(id:number){
  return deleteRequest("/admin/user/" + id)
}

export function changeClinicUser(id: number, user: ClinicUser){
  return patchRequest("/admin/user/" + id, user)
}
