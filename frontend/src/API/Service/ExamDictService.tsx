import { ExamDict } from "../Model/ExamDictModel";
import { getExamDict } from "../Repository/ExamDictRepository";

export function fetchExamDict(
    physical: React.Dispatch<React.SetStateAction<ExamDict[]>>,
    lab: React.Dispatch<React.SetStateAction<ExamDict[]>>
) {
    return getExamDict().then((response) => {
        let physicalList: Array<ExamDict> = []
        let labList: Array<ExamDict> = []
        response.forEach((element: any) => {
            if (element.examinationType === "PHYSICAL") {
                physicalList.push(element)
            }
            else {
                labList.push(element)
            }
        }
        )
        physical(physicalList)
        lab(labList)
    });

}