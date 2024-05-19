import { atom } from "jotai";
import { Doctor } from "../../API/Model/DoctorModel";

export const doctorAtom = atom<Doctor | undefined>(undefined);
export const dateAtom = atom<Date>(new Date());
export const appointmentDateAtom = atom<Date>(new Date());
