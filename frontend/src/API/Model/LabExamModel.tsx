export type LabExam = {
    id: number,
    doctorsNotes: string | undefined,
    orderDate: Date,
    result: string | undefined,
    finishedDate: Date | undefined, 
    supervisorsNotes: string | undefined,
    validationDate: Date | undefined,
    appointmentId: number,
    status: string,
    labTechnicianId: number,
    labSupervisorId: number,
    examinationDictionaryCode: string
} 


