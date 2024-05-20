export type Appointment = {
    id: number;
    description : string;
    diagnosis: string | undefined;
    status: string | undefined;
    registeredDate: Date;
    finishedDate: Date | undefined;
    patientId: number;
    medicalRegistrarId: number;
    doctorId: number;
}