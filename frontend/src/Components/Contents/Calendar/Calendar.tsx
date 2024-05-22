import React, { useEffect, useState } from "react";
import { Popup } from "reactjs-popup";
import { Link, UNSAFE_DataRouterStateContext } from "react-router-dom";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

import { fetchDoctorList } from "../../../API/Service/DoctorService";
import {
  doctorAtom,
  dateAtom,
  appointmentDateAtom,
} from "../../Common/GlobalStates";

import "./Calendar.css";
import { ClockComponent } from "../../Common/Clock";
import { Doctor } from "../../../API/Model/DoctorModel";
import { Patient } from "../../../API/Model/PatientModel";
import { Appointment } from "../../../API/Model/AppointmentModel";

import { fetchPatientById } from "../../../API/Service/PatientService";
import { cancelAppointment, fetchAppointments } from "../../../API/Service/AppointmentService";
import { isBreakOrContinueStatement } from "typescript";
import { visitAtom, visitPatientAtom } from "../../Doctor/Visit/Visit";

type CalendarProps = {
  doctor: Doctor | undefined;
};

export default function Calendar(props: CalendarProps) {
  const doctor = useAtomValue(doctorAtom);

  return (
    <>
      <div className="selectors">
        <div className="doctor-selector">
          <DoctorSelector constDoctor={props.doctor}></DoctorSelector>
        </div>
        <div className="current-time">
          <ClockComponent></ClockComponent>
        </div>
        <div className="week-selector">
          <WeekSelector></WeekSelector>
        </div>
      </div>
      {doctor && <CalendarContent constDoctor={props.doctor}></CalendarContent>}
    </>
  );
}

function WeekSelector() {
  const [currentDate, setCurrentDate] = useAtom<Date>(dateAtom);

  return (
    <>
      <div className="week-selector-div">
        <button
          onClick={() => {
            const newDate = new Date(currentDate);
            newDate.setDate(newDate.getDate() - 7);
            setCurrentDate(newDate);
          }}
        >
          &lt;
        </button>
        &nbsp;{` ${startOfWeek(currentDate).toISOString().split("T")[0]} - ${endOfWeek(currentDate).toISOString().split("T")[0]} `}
        &nbsp;
        <button
          onClick={() => {
            const newDate = new Date(currentDate);
            newDate.setDate(newDate.getDate() + 7);
            setCurrentDate(newDate);
          }}
        >
          &gt;
        </button>
      </div>
    </>
  );
}

type DoctorSelectorProps = {
  constDoctor: Doctor | undefined;
};

function DoctorSelector(props: DoctorSelectorProps) {
  const [doctorAtomic, setDoctor] = useAtom(doctorAtom);
  const [doctorList, setDoctorList] = useState<Array<Doctor>>([]);

  useEffect(() => {
    props.constDoctor && setDoctor(props.constDoctor);
    fetchDoctorList(setDoctorList);
  }, []);

  return (
    <>
      <label htmlFor="select-doctor">
        Select doctor: &nbsp;
        <select
          name="select-doctor"
          id="select-doctor"
          disabled={props.constDoctor !== undefined}
          defaultValue=""
          onChange={(event) => {
            const doctor = doctorList.filter(
              (x) => x.id === parseInt(event.target.value)
            )[0];
            setDoctor(doctor);
          }}
        >
          <option value="" disabled hidden>
            Select from list
          </option>
          {doctorList?.map((doctor, id) => {
            return (
              <option
                key={id}
                value={doctor.id}
                selected={
                  doctor.id === props.constDoctor?.id ||
                  doctor.id === doctorAtomic?.id
                }
              >
                {`${doctor.firstName} ${doctor.lastName}`}
              </option>
            );
          })}
        </select>
      </label>
    </>
  );
}

type CalendarContentProps = {
   constDoctor: Doctor | undefined;
}
function CalendarContent(props: CalendarContentProps) {
  const currentDate = useAtomValue(dateAtom);
  const doctor = useAtomValue(doctorAtom);
  const [appointments, setAppointments] = useState<Array<Appointment>>();
  const [refresh, setRefresh] = useState<boolean>(false)

  const [numberToHour, setNumberToHour] = useState<Array<string>>([]);
  const [dayToDate, setDayToDate] = useState<Array<string>>([]);

  useEffect(() => {
    let startDate = new Date(currentDate);
    mapTimeToIndexedValues(
      setDayToDate,
      getStartOfWeek(startDate),
      setNumberToHour
    );

    doctor && fetchAppointments(doctor.id, startOfWeek(currentDate), endOfWeek(currentDate), setAppointments)
  }, [currentDate, doctor, refresh]);

  return (
    <table className="time-table">
      <tbody>
        <tr>
          <th>Hour</th>
          <th>Monday</th>
          <th>Tuesday</th>
          <th>Wednesday</th>
          <th>Thursday</th>
          <th>Friday</th>
        </tr>
        {numberToHour.map((valueHour, hourIndex) => {
          return (
            <tr key={hourIndex}>
              <td key={0} className="time-table-hour-cell">
                {valueHour}
              </td>
              {dayToDate.map((valueDate, dateIndex) => {
                const dateString = `${valueDate}T${valueHour}:00.000Z`;
                const date = new Date(dateString);
                const visit = appointments?.find((appointment) =>
                    new Date(appointment.visitDate).toISOString() ===
                    dateString
                );

                return (
                  <td key={dateIndex + 1} className="time-table-normal-cell">
                    {props.constDoctor ?
                    <DoctorEntryButton
                      date={date}
                      visit={visit}
                      doctor={props.constDoctor}
                      refresh={refresh}
                      setRefresh={setRefresh}
                    ></DoctorEntryButton>
                    : 
                    <RegistrarEntryButton
                      date={date}
                      visit={visit}
                      doctor={doctor}
                      refresh={refresh}
                      setRefresh={setRefresh}
                    ></RegistrarEntryButton>
                    } 
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function getStartOfWeek(date: Date) {
  const startDate = new Date(date);
  const day = startDate.getDay();
  const diff = startDate.getDate() - day + 2; // Adjust when day is Sunday
  startDate.setDate(diff);
  return startDate;
}

function startOfWeek(currentDate: Date) {
  const startDate = new Date(currentDate);
  startDate.setDate(startDate.getDate() - startDate.getDay() + 2);
  return startDate;
}

function endOfWeek(currentDate: Date) {
  const endDate = new Date(currentDate);
  endDate.setDate(endDate.getDate() + 7 - endDate.getDay() - 1);
  return endDate;
}

function mapTimeToIndexedValues(
  setDayToDate: React.Dispatch<React.SetStateAction<string[]>>,
  startDate: Date,
  setNumberToHour: React.Dispatch<React.SetStateAction<string[]>>
) {
  let dayToDate = [];
  for (let i = 0; i < 5; i++) {
    dayToDate[i] = startDate.toISOString().split("T")[0];
    startDate.setDate(startDate.getDate() + 1);
  }
  setDayToDate(dayToDate);

  const numberToHour = Array.from({ length: 20 }, (_, i) => {
    const hour = Math.floor(i / 2) + 8;
    const minute = i % 2 === 0 ? "00" : "30";
    return `${hour.toString().padStart(2, "0")}:${minute}`;
  });
  setNumberToHour(numberToHour);
}

type EntryButtonProps = {
  date: Date;
  visit: Appointment | undefined;
  doctor: Doctor | undefined;
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>
};

function RegistrarEntryButton(props: EntryButtonProps) {
  const setAppointmentDate = useSetAtom(appointmentDateAtom);
  const [visitDetails, setVisitDetails] = useState<Appointment | undefined>();
  const [patient, setPatient] = useState<Patient | undefined>()

  useEffect(()=> props.visit && fetchPatientById(props.visit.patientId, setPatient), [props.visit])
  
  if(props.visit?.status === "ENDED"){
    // TO BE CONTINUED
    return <button style={{backgroundColor:"red"}}>finished visit</button>
  }
  else if (props.visit)
    return (
      <>
        {visitDetails && (
          <Popup
            open={visitDetails !== undefined}
            onClose={() => setVisitDetails(undefined)}
          >
            <>
              <h1>{new Date(visitDetails.visitDate).toUTCString().split(" ").splice(0, 5).join(" ")}</h1>
              <p>Patient Information:</p>
              <span>{`${patient?.firstName} ${patient?.lastName}`}</span>
              <p>Doctor Information:</p>
              <span>{`${props.doctor?.firstName} ${props.doctor?.lastName}`}</span>
              <p>Description:</p>
              <span>{visitDetails?.description}</span>
              <button className="primary-button" onClick={()=>{
                if(window.confirm("Are you sure that you want to cancel this visit?")){
                  cancelAppointment(visitDetails.id)
                  setVisitDetails(undefined)
                  props.setRefresh(!props.refresh);
                }
              
              }}>Cancel Visit</button>
            </>
          </Popup>
        )}
        <button
          className="visit-entry"
          onClick={() => {
            setVisitDetails(props.visit);
          }}
        >
          {`${patient?.firstName} ${patient?.lastName}`}
        </button>
      </>
    );
  else
    return (
      <Link
        to="/add-visit"
        onClick={() => {
          setAppointmentDate(props.date);
        }}
      >
        <button className="visit-entry empty-entry">ADD VISIT</button>
      </Link>
    );
}

function DoctorEntryButton(props: EntryButtonProps) {
  const setAppointmentDate = useSetAtom(appointmentDateAtom);
  const [visitDetails, setVisitDetails] = useState<Appointment | undefined>();
  const [patient, setPatient] = useState<Patient | undefined>()
  const setVisitPatientAtom = useSetAtom(visitPatientAtom);
  const setVisit = useSetAtom(visitAtom);

  useEffect(()=> props.visit && fetchPatientById(props.visit.patientId, setPatient), [props.visit])
  
  if(props.visit?.status === "ENDED"){
    // TO BE CONTINUED
    return <button style={{backgroundColor:"red"}}>finished visit</button>
  }
  else if (props.visit)
    return (
      <>
        {visitDetails && (
          <Popup
            open={visitDetails !== undefined}
            onClose={() => setVisitDetails(undefined)}
          >
            <>
              <h1>{new Date(visitDetails.visitDate).toUTCString().split(" ").splice(0, 5).join(" ")}</h1>
              <p>Patient Information:</p>
              <span>{`${patient?.firstName} ${patient?.lastName}`}</span>
              <p>Doctor Information:</p>
              <span>{`${props.doctor?.firstName} ${props.doctor?.lastName}`}</span>
              <p>Description:</p>
              <span>{visitDetails?.description}</span>
              <button className="primary-button" onClick={()=>{
                if(window.confirm("Are you sure that you want to cancel this visit?")){
                  cancelAppointment(visitDetails.id)
                  props.visit!.status = "CANCELLED"
                  setVisitDetails(undefined)
                }
              
              }}>Cancel Visit</button>
              <Link to="/visit">
                <button className="primary-button" onClick={()=>{
                  setVisit(visitDetails)
                  setVisitPatientAtom(patient)
                }}>Do Visit</button>
              </Link>
            </>
          </Popup>
        )}
        <button
          className="visit-entry"
          onClick={() => {
            
            setVisitDetails(props.visit);
          }}
        >
          {`${patient?.firstName} ${patient?.lastName}`}
        </button>
      </>
    );
  else
    return (
      <Link
        to="/add-visit"
        onClick={() => {
          setAppointmentDate(props.date);
        }}
      >
        <button className="visit-entry empty-entry">ADD VISIT</button>
      </Link>
    );
}

