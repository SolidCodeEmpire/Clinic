import { useEffect, useState } from "react";
import { Doctor } from "../../../../API/Model/DoctorModel";
import { LabExam } from "../../../../API/Model/LabExamModel";
import {
  cancelLabExam,
  fetchLabExamsWithFilters,
  updateLabExam,
} from "../../../../API/Service/LabExamService";
import Popup from "reactjs-popup";
import { Link } from "react-router-dom";
import { useSetAtom } from "jotai";
import { visitAtom } from "../Visit/Visit";
import { fetchAppointmentById } from "../../../../API/Service/AppointmentService";

import "./ViewExaminations.css";
import { User } from "../../../../API/Model/UserModel";

type ViewExaminationsProps = {
  user: User;
};

export function ViewExaminations(props: ViewExaminationsProps) {
  const [labExamList, setLabExamList] = useState<Array<LabExam>>([]);
  const [labExam, setLabExam] = useState<LabExam>();
  const [refresh, setRefresh] = useState<boolean>(true);

  const [orderDateString, setOrderDateString] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [status, setStatus] = useState<string>("VALIDATED");

  const setVisit = useSetAtom(visitAtom);

  useEffect(() => {
    if (props.user.role === "DOCTOR") {
      fetchLabExamsWithFilters(
        setLabExamList,
        props.user.id,
        orderDateString,
        status
      );
    } else if (props.user?.role === "LAB_TECHNICIAN") {
      fetchLabExamsWithFilters(
        setLabExamList,
        undefined,
        orderDateString,
        "REGISTERED"
      );
    } else if (props.user?.role === "LAB_SUPERVISOR") {
      fetchLabExamsWithFilters(
        setLabExamList,
        undefined,
        orderDateString,
        "DONE"
      );
    }
  }, [refresh]);

  return (
    <div className="view-examinations-container">
      {props.user.role === "DOCTOR" && (
        <div className="exams-filters">
          <div>
            <label>
              {"Order date: "}
              <input
                type="date"
                value={orderDateString}
                onChange={(event) => {
                  setOrderDateString(event.target.value);
                }}
              />
            </label>
          </div>

          <div>
            <label>
              {"Status: "}
              <select
                onChange={(event) => {
                  setStatus(event.target.value);
                }}
              >
                {/* REGISTERED, DONE, CANCELLED, INVALIDATED, VALIDATED */}
                <option value={""}>ANY</option>
                <option value={"REGISTERED"}>REGISTERED</option>
                <option value={"DONE"}>DONE</option>
                <option value={"CANCELLED"}>CANCELLED</option>
                <option value={"INVALIDATED"}>INVALIDATED</option>
                <option value={"VALIDATED"} selected>
                  VALIDATED
                </option>
              </select>
            </label>

            <button
              className="primary-button"
              onClick={() => {
                fetchLabExamsWithFilters(
                  setLabExamList,
                  props.user.id,
                  orderDateString,
                  status
                ).then(()=>console.log(labExamList));
              }}
            >
              Filter
            </button>
          </div>
        </div>
      )}

      <div className="examination-table">
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
              const lowerNotes = value.doctorsNotes?.toLowerCase();
              const isUrgent = lowerNotes?.includes("asap") || lowerNotes?.includes("cito");
              return (
                <tr key={id} className={ isUrgent? "red" : ""}>
                  <td>{value.id}</td>
                  <td>{value.examinationDictionaryCode}</td>
                  <td>
                    {
                      new Date(value.orderDate)
                        .toISOString()
                        .replace("T", " ")
                        .split(".")[0]
                    }
                  </td>
                  <td>{value.status}</td>
                  <td>
                    {value.finishedDate
                      ? new Date(value.finishedDate)
                          .toISOString()
                          .replace("T", " ")
                          .split(".")[0]
                      : "-"}
                  </td>
                  <td>{value.result ? value.result : "-"}</td>
                  <td>
                    {value.doctorsNotes &&
                      (value.doctorsNotes.length < 30
                        ? value.doctorsNotes
                        : value.doctorsNotes.substring(0, 27) + "...")}
                  </td>
                  <td>
                    {props.user.role === "DOCTOR" && (
                      <Link to={"/visit"}>
                        <button
                          onClick={() => {
                            fetchAppointmentById(value.appointmentId, setVisit);
                          }}
                        >
                          Visit
                        </button>
                      </Link>
                    )}
                    <button onClick={() => setLabExam(value)}>View</button>
                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            `Do you want to cancel exam number ${value.id}.`
                          )
                        ) {
                          cancelLabExam(value, refresh, setRefresh);
                        }
                      }}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <Popup
          open={labExam !== undefined}
          onClose={() => {
            setLabExam(undefined);
          }}
        >
          <div>
            <div>
              <label htmlFor="appointmentId">Appointment ID: </label>
              <input type="text" disabled value={labExam?.appointmentId} />
            </div>
            <div>
              <label htmlFor="examinationDictionaryCode">Code: </label>
              <input
                type="text"
                disabled
                value={labExam?.examinationDictionaryCode}
              />
            </div>
            <div>
              <label htmlFor="doctorsNotes">Doctor's notes: </label>
              <input type="text" disabled value={labExam?.doctorsNotes} />
            </div>
            {props.user.role === "LAB_TECHNICIAN" && (
              <div>
                <div>
                  <label htmlFor="result">Result: </label>
                  <input
                    type="text"
                    value={labExam?.result}
                    onChange={(ev) =>
                      setLabExam({ ...labExam!, result: ev.target.value })
                    }
                  />
                </div>
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        `Do you want to cancel visit number ${labExam!.id}`
                      )
                    ) {
                      cancelLabExam(labExam!, refresh, setRefresh).then(() => {
                        setLabExam(undefined);
                      });
                    }
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const newLabExam = { ...labExam!, labTechnicianId: props.user.id, status: "DONE" };

                    updateLabExam(newLabExam).then(() => {
                      setLabExam(undefined);
                      setRefresh(!refresh);
                    });
                  }}
                >
                  save
                </button>
              </div>
            )}
            {props.user.role === "LAB_SUPERVISOR" && (
              <div>
                <div>
                  <label htmlFor="result">Result: </label>
                  <input type="text" value={labExam?.result} disabled />
                </div>
                <div>
                  <label htmlFor="Supervisor notes">Supervisor notes: </label>
                  <input
                    type="text"
                    value={labExam?.supervisorsNotes}
                    onChange={(ev) =>
                      setLabExam({
                        ...labExam!,
                        supervisorsNotes: ev.target.value,
                      })
                    }
                  />
                </div>
                <button
                  onClick={() => {
                    if (window.confirm(`Do you want to invalidate this laboratory examination?`)) {
                      const newLabExam = { ...labExam!, labSupervisorId: props.user.id, status: "INVALIDATED" };

                      updateLabExam(newLabExam).then(() => {
                        setLabExam(undefined);
                        setRefresh(!refresh);
                      });
                    }
                  }}
                >Invalidate</button>
                <button
                  onClick={() => {
                    if (window.confirm(`Do you want to validate this laboratory examination?`)) {
                      const newLabExam = { ...labExam!, labSupervisorId: props.user.id, status: "VALIDATED" };

                      updateLabExam(newLabExam).then(() => {
                        setLabExam(undefined);
                        setRefresh(!refresh);
                      });
                    }
                  }}
                >Validate</button>
              </div>
            )}
          </div>
        </Popup>
      </div>
    </div>
  );
}
