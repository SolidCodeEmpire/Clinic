import { useEffect, useState } from "react";
import { Doctor } from "../../../../API/Model/DoctorModel"
import { LabExamModel } from "../../../../API/Model/LabExamModel";
import { fetchLabExamsByDoctor, cancelLabExam } from "../../../../API/Service/LabExamService";
import Popup from "reactjs-popup";
import { Appointment } from "../../../../API/Model/AppointmentModel";

type ViewExaminationsProps = {
  doctor: Doctor | undefined
}

export function ViewExaminations(props: ViewExaminationsProps) {
  const [labExamList, setLabExamList] = useState<Array<LabExamModel>>([]);
  const [labExam, setLabExam] = useState<LabExamModel>();
  const [refresh, setRefresh] = useState<boolean>(true)


  const [orderDate, setOrderDate] = useState<Date>();
  const [status, setStatus] = useState<string>();

  useEffect(() => {
    if (props.doctor) {
      fetchLabExamsByDoctor(props.doctor, setLabExamList);
    }
  }, [refresh])

  return (
    <>
      <div className="exams-filters">
        <label>Order date: <input type="date"/></label>
        <label>Status: <input type="date"/></label>
        <button className="primary-button" onClick={() => {
          //fetchLabExamsWithFilters(props.doctor, orderDate, status)
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
              return <tr>
                <td>{value.id}</td>
                <td>{value.examinationDictionaryCode}</td>
                <td>{new Date(value.orderDate).toISOString()}</td>
                <td>{value.status}</td>
                <td>{value.finishedDate ? new Date(value.finishedDate).toISOString() : "-"}</td>
                <td>{value.result ? value.result : "-"}</td>
                <td>{value.doctorsNotes && (value.doctorsNotes.length < 30 ? value.doctorsNotes : value.doctorsNotes.substring(0, 27) + "...")}</td>
                <td>
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