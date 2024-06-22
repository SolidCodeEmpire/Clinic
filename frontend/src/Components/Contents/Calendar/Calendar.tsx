import React, { useEffect, useState } from "react";
import { Popup } from "reactjs-popup";
import { Link } from "react-router-dom";
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
import { Appointment } from "../../../API/Model/AppointmentModel";

import { cancelAppointment, fetchAppointments } from "../../../API/Service/AppointmentService";
import { Visit, visitAtom } from "../Doctor/Visit/Visit";
import { startOfWeek, endOfWeek, mapTimeToIndexedValues, getStartOfWeek } from "./CalendarUtils";

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
          <th className={dayToDate[0] ===  new Date().toISOString().slice(0, 10)? "today-mark" : ""}>{`Monday (${dayToDate[0]})`}</th>
          <th className={dayToDate[1] ===  new Date().toISOString().slice(0, 10)? "today-mark" : ""}>{`Tuesday (${dayToDate[1]})`}</th>
          <th className={dayToDate[2] ===  new Date().toISOString().slice(0, 10)? "today-mark" : ""}>{`Wednesday (${dayToDate[2]})`}</th>
          <th className={dayToDate[3] ===  new Date().toISOString().slice(0, 10)? "today-mark" : ""}>{`Thursday (${dayToDate[3]})`}</th>
          <th className={dayToDate[4] ===  new Date().toISOString().slice(0, 10)? "today-mark" : ""}>{`Friday (${dayToDate[4]})`}</th>
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

  if(props.visit?.status === "ENDED"){
    return (
      <button
        disabled
        className="visit-entry">
        {`${props.visit.patientFirstName} ${props.visit.patientLastName}`}
      </button>  
    )
  }
  else if (props.visit)
    return (
      <>
        {visitDetails && (
          <Popup
            className="calendar-registrar-popup"
            open={visitDetails !== undefined}
            onClose={() => setVisitDetails(undefined)}
          >
            <div className="calendar-registrar-popup-container">
              <h1>{new Date(visitDetails.visitDate).toUTCString().split(" ").splice(0, 5).join(" ")}</h1>
              <div className="visit-details-row">
                <label htmlFor="patient-info">Patient Information:</label>
                <input type="text" id="patient-info" name="patient-info" disabled 
                    value={`${props.visit.patientFirstName} ${props.visit.patientLastName}`}/>
              </div>
              <div className="visit-details-row">
                <label htmlFor="doctor-info">Doctor Information:</label>
                <input type="text" id="doctor-info" name="doctor-info" disabled 
                    value={`${props.doctor?.firstName} ${props.doctor?.lastName}`}/>
              </div>
              <div className="visit-details-row">
                <label htmlFor="description">Description:</label>
                <input type="text" id="description" name="description" disabled 
                    value={visitDetails?.description}/>
              </div>
              <button className="primary-button" onClick={()=>{
                if(window.confirm("Are you sure that you want to cancel this visit?")){
                  cancelAppointment(visitDetails.id).then(()=>{
                    setVisitDetails(undefined)
                    props.setRefresh(!props.refresh);
                  })
                }
                
              }}>Cancel Visit</button>
            </div>
          </Popup>
        )}
        <button
          className="visit-entry"
          onClick={() => {
            setVisitDetails(props.visit);
          }}
        >
          {`${props.visit.patientFirstName} ${props.visit.patientLastName}`}
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
  const [visitDetails, setVisitDetails] = useState<Appointment | undefined>();
  const setVisit = useSetAtom(visitAtom);

  if(props.visit?.status === "ENDED"){
    return (
      <button
        disabled
        className="visit-entry">
        {`${props.visit.patientFirstName} ${props.visit.patientLastName}`}
      </button>  
    )
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
              <span>{`${props.visit.patientFirstName} ${props.visit.patientLastName}`}</span>
              <p>Doctor Information:</p>
              <span>{`${props.doctor?.firstName} ${props.doctor?.lastName}`}</span>
              <p>Description:</p>
              <span>{visitDetails?.description}</span>
              <button className="primary-button" onClick={()=>{
                if(window.confirm("Are you sure that you want to cancel this visit?")){
                  cancelAppointment(visitDetails.id).then(()=>{
                    props.setRefresh(!props.refresh)
                    setVisitDetails(undefined)
                  })
                }
              
              }}>Cancel Visit</button>
              <Link to="/visit">
                <button className="primary-button" onClick={()=>{
                  setVisit(visitDetails)
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
          {`${props.visit.patientFirstName} ${props.visit.patientLastName}`}
        </button>
      </>
    );
    else return <></>
}

