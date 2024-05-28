export type LabExamModel = {
    id: number,
    doctorsNotes: string | undefined,
    orderDate: Date,
    result: string | undefined,
    finishedDate: Date | undefined, 
    supervisorNotes: string | undefined,
    validationDate: Date | undefined,
    appointmentId: number,
    status: string,
    labTechnicianId: number | undefined,
    labSupervisorId: number | undefined,
    examinationDictionaryCode: string
} 


