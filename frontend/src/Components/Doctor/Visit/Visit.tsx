import { atom, useAtom, useAtomValue, useSetAtom } from "jotai"
import React, { useEffect, useState } from "react"
import { Appointment } from "../../../API/Model/AppointmentModel"
import { Patient } from "../../../API/Model/PatientModel";
import { Doctor } from "../../../API/Model/DoctorModel";
import { doctorAtom } from "../../Common/GlobalStates";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import { PhysicalExamModel } from "../../../API/Model/PhysicaExamModel";
import { fetchPhysicalExamsByAppointment } from "../../../API/Service/PhysicalExamService";

export const visitAtom = atom<Appointment | undefined>(undefined);
export const visitPatientAtom = atom <Patient | undefined>(undefined);

export function Visit() {
  const [visit, setVisit] = useAtom(visitAtom);
  
  const doctor = useAtomValue(doctorAtom);
  const patient = useAtomValue(visitPatientAtom);

  const [visitPhysicalExams, setVisitPhysicalExams] = useState<PhysicalExamModel[]>([]);
  const [addPhysicalExam, setAddPhysicalExam] = useState<PhysicalExamModel>();

  useEffect(() => {
    visit && fetchPhysicalExamsByAppointment(visit, setVisitPhysicalExams);
  }, [visit])
    
  return <> {
    visit ? (
      <form action="">
        <fieldset>
          <legend>Patient:</legend>
          <label>Name: <input type="text" value={`${patient?.firstName} ${patient?.middleName} ${patient?.lastName}`} disabled/></label>
          <br /> 
          <label>Birth: <input type="text" value={patient && new Date(patient.dateOfBirth).toISOString().split('T')[0]} disabled/></label>
          <br /> 
          <label>Sex: <input type="text" value={patient?.sex} disabled/></label>
        </fieldset>
        <fieldset>
          <legend>Visit info</legend>
          <label htmlFor="date">Registered Date:</label> <input id="date" type="text" value={visit && new Date(visit.visitDate).toISOString()} disabled/>
          <br /> 
          <label htmlFor="description">Description: </label><br/><textarea id="description" rows={10} value={visit.description} disabled/>
          <br /> 
          <label htmlFor="diagnosis">Diagnosis:</label><br/><textarea id="diagnosis" rows={10}/>     
        </fieldset>
        <fieldset>
          <legend>Physical exams:</legend>
          <button type="button" onClick={() => {setAddPhysicalExam({appointmentId: visit.id, examinationDictionaryCode:"", id:0, result:""})}}>Add exam</button>
          <Popup open={addPhysicalExam !== undefined} onClose={() => {}}>
            <div>
              <label>Select exam type: <select></select></label>
              <label>Result: <input type="text" value={addPhysicalExam?.result}  
              onChange={(event) => {
                setAddPhysicalExam({...addPhysicalExam!, result:event.target.value})
              }}/></label>
              <button onClick={() => { console.log(addPhysicalExam); setAddPhysicalExam(undefined);}}>Save</button>
            </div>
          </Popup>
          <table>
            <thead>
              <tr>
                <th>Exam type</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {visitPhysicalExams.map((item, id) => {
                return <tr>
                  <td>{item.examinationDictionaryCode}</td>
                  <td>{item.result}</td>
                </tr>
              })}
            </tbody>
          </table>
        </fieldset>
        <fieldset>
          <legend>Laboratory exams:</legend>
          <button type="button">Add exam</button>

          <table>
            <thead>
              <tr>
                <th>Exam type</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              
            </tbody>
          </table>
        </fieldset>
        <button>End visit</button>
      </form>

    ) : (
      <h1>Loading</h1>
    )
  }

  </>
}