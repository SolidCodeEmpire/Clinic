import { LabExamModel } from "../Model/LabExamModel";
import { deleteRequest, getRequest } from "./FetchFromApi";

export function getLabExamsByDoctor(doctorId: number) {
    return getRequest("/laboratory_examinations");
}

export function getLabExamsByVisit(visitId: number) {
    return getRequest("/laboratory_examinations", {appointmentId: visitId});
}

export function deleteLabExam(exam: LabExamModel) {
    return deleteRequest(`/laboratory_examination/${exam.id}`);
}