export type Appointment = {
    id: number;
    description : string;
    diagnosis: string | undefined;
    status: string | undefined;
    visitDate: Date;
    patientId: number;
    patientFirstName: string;
    patientLastName: string;
    medicalRegistrarId: number;
    doctorId: number;
}