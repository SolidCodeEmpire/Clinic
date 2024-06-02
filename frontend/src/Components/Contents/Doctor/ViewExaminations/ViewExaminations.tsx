import { useEffect, useState } from "react";
import { Doctor } from "../../../../API/Model/DoctorModel"
import { LabExamModel } from "../../../../API/Model/LabExamModel";
import { fetchLabExamsByDoctor, cancelLabExam, fetchLabExamsWithFilters } from "../../../../API/Service/LabExamService";
import Popup from "reactjs-popup";
import { Link } from "react-router-dom";
import { useSetAtom } from "jotai";
import { visitAtom } from "../Visit/Visit";
import { fetchAppointmentById } from "../../../../API/Service/AppointmentService";

type ViewExaminationsProps = {
  doctor: Doctor | undefined
}

export function ViewExaminations(props: ViewExaminationsProps) {
  const [labExamList, setLabExamList] = useState<Array<LabExamModel>>([]);
  const [labExam, setLabExam] = useState<LabExamModel>();
  const [refresh, setRefresh] = useState<boolean>(true)


  const [orderDateString, setOrderDateString] = useState<string>(new Date().toISOString().split("T")[0]);
  const [status, setStatus] = useState<string>("VALIDATED");

  const setVisit = useSetAtom(visitAtom);

  useEffect(() => {
    props.doctor && fetchLabExamsWithFilters(
      props.doctor, orderDateString, status, setLabExamList
    )
  }, [refresh])

  return (
    <>
      <div className="exams-filters">
        <label>Order date:
          <input type="date" 
          value={orderDateString} 
          onChange={(event) => {
            setOrderDateString(event.target.value);
          }} />
        </label>
        <label>Status:
          <select onChange={(event) => {
            setStatus(event.target.value);
          }}>
            {/* REGISTERED, DONE, CANCELLED, INVALIDATED, VALIDATED */}
            <option value={"REGISTERED"}>REGISTERED</option>
            <option value={"DONE"}>DONE</option>
            <option value={"CANCELED"}>CANCELED</option>
            <option value={"INVALIDATED"}>INVALIDATED</option>
            <option value={"VALIDATED"} selected>VALIDATED</option>
          </select>
        </label>
        <button className="primary-button" onClick={() => {
          props.doctor && fetchLabExamsWithFilters(
            props.doctor, orderDateString, status, setLabExamList
          )
        }}>
          Filter
        </button>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>Examination type</th>
              <th>Order date</th>
              <th>Status</th>
              <th>Finished date</th>
              <th>Result</th>
              <th>Notes</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {labExamList.map((value, id) => {
              return (
                <tr key={id}>
                  <td>{value.id}</td>
                  <td>{value.examinationDictionaryCode}</td>
                  <td>{new Date(value.orderDate).toISOString()}</td>
                  <td>{value.status}</td>
                  <td>{value.finishedDate ? new Date(value.finishedDate).toISOString() : "-"}</td>
                  <td>{value.result ? value.result : "-"}</td>
                  <td>{value.doctorsNotes && (value.doctorsNotes.length < 30 ? value.doctorsNotes : value.doctorsNotes.substring(0, 27) + "...")}</td>
                  <td>
                    <Link to={"/visit"}>
                      <button onClick={() => {
                        fetchAppointmentById(value.appointmentId, setVisit);
                      }}>Visit</button>
                    </Link>
                    <button onClick={() => setLabExam(value)}>View</button>
                    <button onClick={() => {
                      if (window.confirm(`Do you want to cancel visit number ${value.id}`)) {
                        cancelLabExam(value, refresh, setRefresh);
                      }
                    }
                    }
                    >Cancel</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <Popup open={labExam !== undefined} onClose={() => { setLabExam(undefined) }}>
          <div>

          </div>
        </Popup>
      </div>
    </>
  )
}