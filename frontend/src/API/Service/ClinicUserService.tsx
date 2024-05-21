import { ClinicUser } from "../Model/ClinicUserModel";
import {
  getClinicUsersDoctor,
  getClinicUsersReceptionist,
  getClinicUsersSupervisor,
  getClinicUsersTechnician,
} from "../Repository/ClinicUserRepository";

type ClinicUserListDispatcher = React.Dispatch<React.SetStateAction<ClinicUser[] | undefined>>

export function fetchClinicUsers(setUsers: ClinicUserListDispatcher) {
  let userList: Array<ClinicUser> = [];

  const userListReceptionist = getClinicUsersReceptionist()
  const userListDoctors = getClinicUsersDoctor()
  const userListTechnician = getClinicUsersTechnician()
  const userListSupervisor = getClinicUsersSupervisor()

  Promise.all([userListReceptionist, userListDoctors, userListTechnician, userListSupervisor]).then((lists)=>{
    lists.forEach((list)=>{userList = userList.concat(list)})
    setUsers(userList)
  })
}
