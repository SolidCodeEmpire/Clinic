import { LabExam } from "../Model/LabExamModel";
import { deleteRequest, getRequest, postRequest} from "./FetchFromApi";

export function getLabExamsWithFilters(doctorId: number|undefined, date?:string, status?:string) {
    let filter = {}
    if (doctorId) {
        filter = {...filter, "doctorId" : doctorId} 
    }

    if (status !== "") {
        filter = {...filter, "status" : status} 
    }

    if (date !== "" ) {
        filter = {...filter, "date" : date }
    }

    return getRequest("/laboratory_examinations", filter);
}

export function getLabExamsByVisit(visitId: number) {
    return getRequest("/laboratory_examinations", {appointmentId: visitId});
}

export function deleteLabExam(exam: LabExam) {
    return deleteRequest(`/laboratory_examination/${exam.id}`);
}

export function postLabExam(exam: LabExam) {
    return postRequest("/laboratory_examination", exam);
}