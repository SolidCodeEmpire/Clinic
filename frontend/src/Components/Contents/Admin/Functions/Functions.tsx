import { ClinicUser } from "../../../../API/Model/ClinicUserModel";
import {
  addClinicUser,
  deleteClinicUser,
  updateClinicUser,
} from "../../../../API/Service/ClinicUserService";

export function addUser(
  user: ClinicUser | undefined,
  refresh: boolean,
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (user) {
      if (window.confirm(`Are you sure you want to add user?`)) {
      addClinicUser(user).then(() => {
        setRefresh(!refresh);
      });
    }
  } else {
    alert("Error: User is undefined");
  }
}

export function cancelUser(
  user: ClinicUser,
  setUser: React.Dispatch<React.SetStateAction<ClinicUser | undefined>>,
  refresh: boolean,
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (
    window.confirm(
      `Are you sure you want to delete user: ${user.firstName} ${user.lastName}`
    )
  ) {
    deleteClinicUser(user.id).then(() => {
      setUser(undefined);
      setRefresh(!refresh);
    });
  }
}

export function modifyUser(
  user: ClinicUser | undefined,
  setUser: React.Dispatch<React.SetStateAction<ClinicUser | undefined>>,
  refresh: boolean,
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (user) {
    const result = validateUser(user)
    
    if(!result.valid){
        alert(result.errorMessage)
        return
    }

    if (window.confirm(`Are you sure you want to modify this user?`)) {
      updateClinicUser(user.id, user).then(() => {
        setUser(undefined);
        setRefresh(!refresh);
      });
    }
  } else {
    alert("Error: User is not selected");
  }
}

export function validateUser(user: ClinicUser){
    if(!user.email || !user.firstName || !user.lastName || !user.username){
        return {valid: false, errorMessage: "Error: Specify all data for user"}
    }

    if(!["MEDICAL_REGISTRAR", "DOCTOR", "LAB_TECHNICIAN", "LAB_SUPERVISOR", "ADMIN"].includes(user.userType)){
        return {valid: false, errorMessage: "Error: Problem occured while trying to check user type"}
    }

    if(user.userType === "DOCTOR" && !user.licenseNumber){
        return {valid: false, errorMessage: "Error: License number is not specified"}
    }

    if(user.userType === "DOCTOR" && !(/^\d+$/.test(user.licenseNumber!))){
        return {valid: false, errorMessage: "Error: License number should contain only digits"}
    }

    return {valid: true, errorMessage: ""}
}