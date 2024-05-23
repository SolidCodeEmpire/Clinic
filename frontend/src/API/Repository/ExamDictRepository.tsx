import { getRequest } from "./FetchFromApi";

export function getExamDict(){
    return getRequest("/examination_dictionary")
}