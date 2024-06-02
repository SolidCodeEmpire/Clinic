import { Appointment } from "../Model/AppointmentModel";
import { Doctor } from "../Model/DoctorModel";
import { LabExamModel } from "../Model/LabExamModel";
import { getAppointmentById } from "../Repository/AppointmentRepository";
import { deleteLabExam, getLabExamsByDoctor, getLabExamsByVisit, postLabExam } from "../Repository/LabExamRepository";


export function fetchLabExamsByDoctor(
  doctor: Doctor,
  labExamsDispatcher: React.Dispatch<React.SetStateAction<LabExamModel[]>>
) {
  return getLabExamsByDoctor(doctor.id).then((response: Array<LabExamModel>) => {
    labExamsDispatcher(response);
    return response;
  });
}

export function fetchLabExamsWithFilters(
  doctor: Doctor,
  dateString: string,
  status: string,
  labExamsDispatcher: React.Dispatch<React.SetStateAction<LabExamModel[]>>
) {
  return getLabExamsByDoctor(doctor.id).then((response: Array<LabExamModel>) => {
    labExamsDispatcher(
      response.filter((value) =>
        new Date(value.orderDate).toISOString().startsWith(dateString) &&
        value.status === status
      )
    );
  })
}

export function fetchLabExamsByVisit(
  visit: Appointment,
  labExamsDispatcher: React.Dispatch<React.SetStateAction<LabExamModel[]>>
) {
  return getLabExamsByVisit(visit.id).then((response: Array<LabExamModel>) => {
    labExamsDispatcher(response);
    return response;
  });
}

export function cancelLabExam(
  exam: LabExamModel, 
  refresh: boolean, 
  dispatcher: React.Dispatch<React.SetStateAction<boolean>>
) {
  return deleteLabExam(exam).then((response) => { dispatcher(!refresh) });
}

export function submitLabExam(exam: LabExamModel) {
  return postLabExam(exam);
}