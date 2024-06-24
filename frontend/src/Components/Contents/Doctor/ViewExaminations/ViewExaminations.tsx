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
                ).then(() => console.log(labExamList));
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
              const isUrgent =
                lowerNotes?.includes("asap") || lowerNotes?.includes("cito");
              return (
                <tr key={id} className={isUrgent ? "red" : ""}>
                  <td>{value.id}</td>
                  <td>{value.examinationDictionaryCode}</td>
                  <td>{new Date(value.orderDate).toLocaleString()}</td>
                  <td>{value.status}</td>
                  <td>
                    {value.finishedDate
                      ? new Date(value.finishedDate).toLocaleString()
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
                          className="primary-button margin-0 margin-right-10"
                          onClick={() => {
                            fetchAppointmentById(value.appointmentId, setVisit);
                          }}
                        >
                          Visit
                        </button>
                      </Link>
                    )}
                    <button
                      className="primary-button margin-0 margin-right-10"
                      onClick={() => setLabExam(value)}
                    >
                      View
                    </button>
                    <button
                      className="primary-button margin-0"
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
          className="exam-popup"
          open={labExam !== undefined}
          onClose={() => {
            setLabExam(undefined);
          }}
        >
          <div className="exam-popup-container">
            <div className="exam-details-row">
              <label htmlFor="appointmentId" className="margin-right-10">
                Appointment ID:{" "}
              </label>
              <input type="text" disabled value={labExam?.appointmentId} />
            </div>
            <div className="exam-details-row">
              <label
                htmlFor="examinationDictionaryCode"
                className="margin-right-10"
              >
                Code:{" "}
              </label>
              <input
                type="text"
                disabled
                value={labExam?.examinationDictionaryCode}
              />
            </div>
            <div className="exam-details-row">
              <label htmlFor="doctorsNotes" className="margin-right-10">
                Doctor's notes:{" "}
              </label>
              <input type="text" disabled value={labExam?.doctorsNotes} />
            </div>
            {props.user.role === "LAB_TECHNICIAN" && (
              <div className="exam-details-row">
                <label htmlFor="result" className="margin-right-10">
                  Result:{" "}
                </label>
                <input
                  type="text"
                  value={labExam?.result}
                  onChange={(ev) =>
                    setLabExam({ ...labExam!, result: ev.target.value })
                  }
                />
              </div>
            )}
            {props.user.role === "LAB_TECHNICIAN" && (
              <div>
                <button
                  className="primary-button margin-right-10"
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
                  className="primary-button"
                  onClick={() => {
                    const newLabExam = {
                      ...labExam!,
                      labTechnicianId: props.user.id,
                      status: "DONE",
                    };

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
              <div className="exam-details-row">
                <label htmlFor="result" className="margin-right-10">
                  Result:
                </label>
                <input type="text" value={labExam?.result} disabled />
              </div>
            )}
            {props.user.role === "LAB_SUPERVISOR" && (
              <div className="exam-details-row">
                <label htmlFor="Supervisor notes" className="margin-right-10">
                  Supervisor notes:{" "}
                </label>
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
            )}
            {props.user.role === "LAB_SUPERVISOR" && (
              <div>
                <button
                  className="primary-button margin-right-10"
                  onClick={() => {
                    if (
                      window.confirm(
                        `Do you want to invalidate this laboratory examination?`
                      )
                    ) {
                      const newLabExam = {
                        ...labExam!,
                        labSupervisorId: props.user.id,
                        status: "INVALIDATED",
                      };

                      updateLabExam(newLabExam).then(() => {
                        setLabExam(undefined);
                        setRefresh(!refresh);
                      });
                    }
                  }}
                >
                  Invalidate
                </button>
                <button
                  className="primary-button"
                  onClick={() => {
                    if (
                      window.confirm(
                        `Do you want to validate this laboratory examination?`
                      )
                    ) {
                      const newLabExam = {
                        ...labExam!,
                        labSupervisorId: props.user.id,
                        status: "VALIDATED",
                      };

                      updateLabExam(newLabExam).then(() => {
                        setLabExam(undefined);
                        setRefresh(!refresh);
                      });
                    }
                  }}
                >
                  Validate
                </button>
              </div>
            )}
          </div>
        </Popup>
      </div>
    </div>
  );
}
