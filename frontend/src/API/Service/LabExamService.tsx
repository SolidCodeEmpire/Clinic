import { Appointment } from "../Model/AppointmentModel";
import { Doctor } from "../Model/DoctorModel";
import { LabExam } from "../Model/LabExamModel";
import { deleteLabExam, getLabExamsByVisit, getLabExamsWithFilters, postLabExam } from "../Repository/LabExamRepository";


export function fetchLabExamsByDoctor(
  doctor: Doctor,
  labExamsDispatcher: React.Dispatch<React.SetStateAction<LabExam[]>>
) {
  return getLabExamsWithFilters(doctor.id).then((response: Array<LabExam>) => {
    labExamsDispatcher(response);
    return response;
  });
}

export function fetchLabExamsWithFilters(
  labExamsDispatcher: React.Dispatch<React.SetStateAction<LabExam[]>>,
  doctor?: Doctor,
  dateString?: string,
  status?: string
) {
  return getLabExamsWithFilters(doctor?.id, dateString, status).then((response: Array<LabExam>) => {
    labExamsDispatcher(response);
  })
}

export function fetchLabExamsByVisit(
  visit: Appointment,
  labExamsDispatcher: React.Dispatch<React.SetStateAction<LabExam[]>>
) {
  return getLabExamsByVisit(visit.id).then((response: Array<LabExam>) => {
    labExamsDispatcher(response);
    return response;
  });
}

export function cancelLabExam(
  exam: LabExam, 
  refresh: boolean, 
  dispatcher: React.Dispatch<React.SetStateAction<boolean>>
) {
  return deleteLabExam(exam).then((response) => { dispatcher(!refresh) });
}

export function submitLabExam(exam: LabExam) {
  return postLabExam(exam);
}