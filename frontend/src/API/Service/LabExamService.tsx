import { Appointment } from "../Model/AppointmentModel";
import { Doctor } from "../Model/DoctorModel";
import { LabExamModel } from "../Model/LabExamModel";
import { deleteLabExam, getLabExamsByVisit, getLabExamsWithFilters, postLabExam } from "../Repository/LabExamRepository";


export function fetchLabExamsByDoctor(
  doctor: Doctor,
  labExamsDispatcher: React.Dispatch<React.SetStateAction<LabExamModel[]>>
) {
  return getLabExamsWithFilters(doctor.id).then((response: Array<LabExamModel>) => {
    labExamsDispatcher(response);
    return response;
  });
}

export function fetchLabExamsWithFilters(
  labExamsDispatcher: React.Dispatch<React.SetStateAction<LabExamModel[]>>,
  doctor?: Doctor,
  dateString?: string,
  status?: string
) {
  return getLabExamsWithFilters(doctor?.id, dateString, status).then((response: Array<LabExamModel>) => {
    labExamsDispatcher(response);
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