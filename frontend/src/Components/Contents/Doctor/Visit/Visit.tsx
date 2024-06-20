import { atom, useAtom, useAtomValue } from "jotai"
import React, { useEffect, useState } from "react"
import { Appointment } from "../../../../API/Model/AppointmentModel"
import { Patient } from "../../../../API/Model/PatientModel";
import { doctorAtom } from "../../../Common/GlobalStates";
import Popup from "reactjs-popup";
import { PhysicalExamModel } from "../../../../API/Model/PhysicalExamModel";
import { fetchPhysicalExamsByAppointment, submitPhysicalExam } from "../../../../API/Service/PhysicalExamService";
import { LabExam } from "../../../../API/Model/LabExamModel";
import { fetchLabExamsByVisit, submitLabExam } from "../../../../API/Service/LabExamService";
import { fetchExamDict } from "../../../../API/Service/ExamDictService";
import { ExamDict } from "../../../../API/Model/ExamDictModel";
import { updateAppointment } from "../../../../API/Service/AppointmentService";
import { Link, useNavigate } from "react-router-dom";
import { fetchPatientById } from "../../../../API/Service/PatientService";

import './Visit.css'
import { deleteAppointment } from "../../../../API/Repository/AppointmentRepository";

export const visitAtom = atom<Appointment | undefined>(undefined);

export function Visit() {
  const [visit, setVisit] = useAtom(visitAtom);

  const doctor = useAtomValue(doctorAtom);


  const [visitPhysicalExams, setVisitPhysicalExams] = useState<PhysicalExamModel[]>([]);
  const [addPhysicalExam, setAddPhysicalExam] = useState<PhysicalExamModel>();
  const [visitLabExams, setVisitLabExams] = useState<LabExam[]>([]);
  const [addLabExam, setAddLabExam] = useState<LabExam>();

  const [examTypesPhysical, setExamTypesPhysical] = useState<ExamDict[]>([])
  const [examTypesLab, setExamTypesLab] = useState<ExamDict[]>([])
  const [diagnosis, setDiagnosis] = useState("");
  const [patient, setPatient] = useState<Patient>();


  const navigate = useNavigate();
  
  useEffect(() => {
    visit?.diagnosis && setDiagnosis(visit.diagnosis)
  }, [])

  useEffect(() => {
    visit && fetchPhysicalExamsByAppointment(visit, setVisitPhysicalExams);
    visit && fetchLabExamsByVisit(visit, setVisitLabExams);
    visit && fetchPatientById(visit?.patientId, setPatient);
    fetchExamDict(setExamTypesPhysical, setExamTypesLab);
  }, [visit])

  return <> {
    visit ? (
      <form action="" >
        <fieldset>
          <legend>Patient:</legend>
          <label>Name: <input type="text" value={`${patient?.firstName} ${patient?.middleName} ${patient?.lastName}`} disabled /></label>
          <label>Birth: <input type="text" value={patient && new Date(patient.dateOfBirth).toISOString().split('T')[0]} disabled /></label>
          <label>Sex: <input type="text" value={patient?.sex} disabled /></label>
        </fieldset>
        <fieldset>
          <legend>Visit info</legend>
          <label htmlFor="date">Registered Date:</label> <input id="date" type="text" value={visit && new Date(visit.visitDate).toISOString()} disabled />
          <label htmlFor="description">Description: </label><br /><textarea id="description" rows={10} value={visit.description} disabled />
          <label htmlFor="diagnosis">Diagnosis:</label><br /><textarea value={diagnosis}
            onChange={(event) => setDiagnosis(event.target.value)} id="diagnosis" rows={10} />
        </fieldset>
        <div className="exams-container">
          <fieldset className="exams-panel">
            <legend>Physical exams:</legend>
            {physicalPopupWrapper(addPhysicalExam, setAddPhysicalExam, examTypesPhysical, setVisitPhysicalExams, visitPhysicalExams)}
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
            <button className="primary-button" type="button" onClick={() => { setAddPhysicalExam({ appointmentId: visit.id, examinationDictionaryCode: "", id: 0, result: "" }) }}>Add exam</button>
          </fieldset>
          <fieldset className="exams-panel">
            <legend>Laboratory exams:</legend>
            {labExamPopupWrapper(addLabExam, setAddLabExam, examTypesLab, setVisitLabExams, visitLabExams)}
            <table>
              <thead>
                <tr>
                  <th>Exam type</th>
                  <th>Doctor notes</th>
                  <th>Order date</th>
                  <th>Status</th>
                  <th>Finished date</th>
                </tr>
              </thead>
              <tbody>
                {visitLabExams.map((item, id) => {
                  return <tr>
                    <td>{item.examinationDictionaryCode}</td>
                    <td>{item.doctorsNotes}</td>
                    <td>{new Date(item.orderDate).toISOString()}</td>
                    <td>{item.status}</td>
                    <td>{item.finishedDate ? new Date(item.finishedDate).toISOString() : "-"}</td>
                  </tr>
                })}
              </tbody>
            </table>
            <button className="primary-button" type="button" onClick={() => {
              setAddLabExam(
                {
                  id: 0,
                  appointmentId: visit.id,
                  doctorsNotes: "",
                  orderDate: new Date(),
                  examinationDictionaryCode: "",
                  result: "",
                  finishedDate: undefined,
                  supervisorsNotes: undefined,
                  validationDate: undefined,
                  status: "REGISTERED",
                  labTechnicianId: 0,
                  labSupervisorId: 0,
                }
              )
            }}>Add exam</button>
          </fieldset>
        </div>
        <Link to="/calendar">
          <button>
            Back
          </button>
        </Link>
        <button type="button"
          onClick={() => {
            deleteAppointment(visit.id).then(() => {
              navigate("/calendar");
            });
          }}
        >Cancel visit</button>
        <button type="button"
          onClick={() => {
            setVisit({...visit, diagnosis: diagnosis});
            updateAppointment({...visit, diagnosis: diagnosis}).then(() => {
              navigate("/calendar");
            });
          }}
        >Save visit</button>
        <button type="button"
          onClick={() => {
            setVisit({ ...visit, diagnosis: diagnosis, status: "ENDED" });
            updateAppointment({ ...visit, diagnosis: diagnosis, status: "ENDED" }).then(() => {
              navigate("/calendar");
            });
          }}
        >End visit</button>
      </form>
    ) : (
      <h1>Loading</h1>
    )
  }

  </>
}

function labExamPopupWrapper(
  addLabExam: LabExam | undefined, 
  setAddLabExam: React.Dispatch<React.SetStateAction<LabExam | undefined>>,
  examTypesLab: ExamDict[], 
  setVisitLabExams: React.Dispatch<React.SetStateAction<LabExam[]>>, 
  visitLabExams: LabExam[]
) {
  return <Popup open={addLabExam !== undefined} onClose={() => { setAddLabExam(undefined) }}>
    <div>
      <label>Select exam type:
        <select onChange={(event) => {
          addLabExam && setAddLabExam({...addLabExam, examinationDictionaryCode: event.target.value});
        }}>
          <option value={""}>Default</option>
          {examTypesLab.map((element) => {
            return <option value={element.code}>{element.examinationName}</option>;
          })}
        </select>
      </label>
      <label>Doctor notes:
        <textarea rows={10} value={addLabExam?.doctorsNotes} onChange={(event) => {
          addLabExam && setAddLabExam({...addLabExam, doctorsNotes: event.target.value});
        }}/> 

      </label>
      <button onClick={() => {
        if (addLabExam?.examinationDictionaryCode !== "") {
          addLabExam && submitLabExam(addLabExam);
          addLabExam && setVisitLabExams([...visitLabExams, addLabExam]);
          setAddLabExam(undefined);
        }
        else {
          alert("Chose exam type");
        }
      }}>Save</button>
    </div>
  </Popup>;
}

function physicalPopupWrapper(
  addPhysicalExam: PhysicalExamModel | undefined, 
  setAddPhysicalExam: React.Dispatch<React.SetStateAction<PhysicalExamModel | undefined>>, 
  examTypesPhysical: ExamDict[], 
  setVisitPhysicalExams: React.Dispatch<React.SetStateAction<PhysicalExamModel[]>>, 
  visitPhysicalExams: PhysicalExamModel[]
) {
  return <Popup open={addPhysicalExam !== undefined} onClose={() => {setAddPhysicalExam(undefined) }}>
    <div>
      <label>Select exam type:
        <select onChange={(event) => {
          setAddPhysicalExam({ ...addPhysicalExam!, examinationDictionaryCode: event.target.value });
        }}>
          <option value={""}>Default</option>
          {examTypesPhysical.map((element) => {
            return <option value={element.code}>{element.examinationName}</option>;
          })}
        </select>
      </label>
      <label>Result: <input type="text" value={addPhysicalExam?.result}
        onChange={(event) => {
          setAddPhysicalExam({ ...addPhysicalExam!, result: event.target.value });
        }} /></label>
      <button onClick={() => {
        if (addPhysicalExam?.examinationDictionaryCode !== "") {
          setAddPhysicalExam(undefined);
          addPhysicalExam && submitPhysicalExam(addPhysicalExam);
          addPhysicalExam && setVisitPhysicalExams([...visitPhysicalExams, addPhysicalExam]);
        }
        else {
          alert("Chose exam type");
        }
      }}>Save</button>
    </div>
  </Popup>;
}
