import { getRequest } from "./FetchFromApi";

export function getDoctors() {
    return getRequest("/doctors");
}