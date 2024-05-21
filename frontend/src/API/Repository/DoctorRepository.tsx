import { getRequest } from "./FetchFromApi";

export function getDoctors() {
    return getRequest("/doctors");
}

export function getDoctorById(id: number) {
    return getRequest("/doctor/<:id>", {}, {id: id});
}