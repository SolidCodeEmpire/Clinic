import { ClinicUser } from "../Model/ClinicUserModel";
import { addNewClinicUser, changeClinicUser, deactivateClinicUser, getClinicUsers } from "../Repository/ClinicUserRepository";

type ClinicUserListDispatcher = React.Dispatch<React.SetStateAction<ClinicUser[] | undefined>>

export function fetchClinicUsers(setUsers: ClinicUserListDispatcher) {
  getClinicUsers().then((response)=>{
    const userList = response.map((user: ClinicUser)=>{
      user.licenseNumber = user.licenseNumber?.toString() === "0" ? undefined : user.licenseNumber
      return user
    })
    setUsers(userList)
  })
}

export function addClinicUser(user: ClinicUser) {
  return addNewClinicUser(user)
}


export function deleteClinicUser(id:number){
  return deactivateClinicUser(id);
}

export function updateClinicUser(id:number, user:ClinicUser){
  return changeClinicUser(id, user)
}