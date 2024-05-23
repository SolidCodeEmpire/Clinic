import { ClinicUser } from "../Model/ClinicUserModel";
import { deleteRequest, getRequest, patchRequest, postRequest } from "./FetchFromApi";

export function getClinicUsers() {
  return getRequest("/admin/users");
}

export function addNewClinicUser(user: ClinicUser) {
  return postRequest("/admin/user", user)
}

export function deactivateClinicUser(id:number){
  return deleteRequest("/admin/user/" + id)
}

export function changeClinicUser(id: number, user: ClinicUser){
  if(user.userType === "DOCTOR" && user.licenseNumber === undefined) user.licenseNumber = "-1"
  return patchRequest("/admin/user/" + id, user)
}
