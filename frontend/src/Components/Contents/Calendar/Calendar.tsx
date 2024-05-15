import React, { useEffect, useState } from "react";
import { Popup } from 'reactjs-popup'
import { Link } from "react-router-dom";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

import { Doctor, fetchDoctorList } from "../../../API/Doctors";
import { doctorAtom, dateAtom, appointmentsAtom, appointmentDateAtom } from "./GlobalStates";

import "./Calendar.css";
import { start } from "repl";
import { Patient } from "../../../API/Patients";


type CalendarProps = {
  doctor: Doctor | undefined;
};

export default function Calendar(props: CalendarProps) {
  const doctor = useAtomValue(doctorAtom);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  setTimeout(() => {
    setCurrentTime(new Date());
  }, 1000);

  return (
    <>
      <div className="selectors">
        <div className="doctor-selector">
          <DoctorSelector constDoctor={props.doctor}></DoctorSelector>
        </div>
        <div className="current-time">{currentTime.toLocaleString()}</div>
        <div className="week-selector">
          <WeekSelector></WeekSelector>
        </div>
      </div>
      {doctor && <CalendarContent doctor={props.doctor}></CalendarContent>}
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
        &nbsp;{` ${startOfWeek(currentDate)} - ${endOfWeek(currentDate)} `}
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
  const setAppointments = useSetAtom(appointmentsAtom);
  const [doctorList, setDoctorList] = useState<Array<Doctor>>([]);

  useEffect(() => {
    props.constDoctor && setDoctor(props.constDoctor);
    props.constDoctor &&
      setAppointments(
        props.constDoctor.appointments.map((value, id) => {
          return value.start.toISOString().split("Z")[0];
        })
      );
    fetchDoctorList(setDoctorList);
  });

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
            setAppointments(
              doctor.appointments.map(
                (value, id) => value.start.toISOString().split("Z")[0]
              )
            );
          }}
        >
          <option value="" disabled hidden>
            Select from list
          </option>
          {doctorList.map((doctor, id) => {
            return (
              <option
                key={id}
                value={doctor.id}
                selected={doctor.id === props.constDoctor?.id || doctor.id === doctorAtomic?.id}
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
  doctor: Doctor | undefined;
};

function CalendarContent(props: CalendarContentProps) {
  const currentDate = useAtomValue(dateAtom);
  const appointments = useAtomValue(appointmentsAtom);

  const startDate = new Date(currentDate);
  const numberToHour: Array<string> = [];
  const dayToDate: Array<string> = [];

  startDate.setDate(startDate.getDate() - startDate.getDay() + 1);

  mapTimeToIndexedValues(dayToDate, startDate, numberToHour);

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
        {numberToHour.map((valueHour, id) => {
          return (
            <tr key={id.toString()}>
              <td key={0} className="time-table-hour-cell">
                {valueHour}
              </td>
              {dayToDate.map((valueDate, id) => {
                const dateString = `${valueDate}T${valueHour}:00.000`;
                const date = new Date(dateString);
                const visit = appointments.includes(dateString);
                return (
                  <td key={id + 1} className="time-table-normal-cell">
                    {EntryButton(date, visit, props.doctor)}
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

function startOfWeek(currentDate: Date) {
  const startDate = new Date(currentDate);
  startDate.setDate(startDate.getDate() - startDate.getDay() + 1);
  return startDate.toISOString().split("T")[0];
}

function endOfWeek(currentDate: Date) {
  const endDate = new Date(currentDate);
  endDate.setDate(endDate.getDate() + 7 - endDate.getDay());
  return endDate.toISOString().split("T")[0];
}

function mapTimeToIndexedValues(
  dayToDate: string[],
  startDate: Date,
  numberToHour: string[]
) {
  for (let i = 0; i < 5; i++) {
    dayToDate[i] = startDate.toISOString().split("T")[0];
    startDate.setDate(startDate.getDate() + 1);
  }

  for (let i = 0; i < 60 * 10; i += 30) {
    const hour = Math.floor(i / 60) + 8;
    const minute = (i % 60).toString().padStart(2, "0");
    const timeString = `${hour.toString().padStart(2, "0")}:${minute}`;

    numberToHour[i / 30] = timeString;
  }
}

type Visit = {
  start: Date;
  description: string;
  patient: Patient;
}

function EntryButton(date: Date, visit: boolean, doctor: Doctor | undefined) {
  const setAppointmentDate = useSetAtom(appointmentDateAtom)
  const [visitDetails, setVisitDetails] = useState<Visit | undefined>()

  if (visit) return <>
    <Popup open={visitDetails !== undefined} onClose={() => setVisitDetails(undefined)}>
      <>
        <h1>{visitDetails?.start.toUTCString().split(' ').splice(0, 5).join(' ')}</h1>
        <p>Patient:</p>
        <span>
          {`${visitDetails?.patient.firstName} ${visitDetails?.patient.surname}`}
        </span>
        <p>Description:</p>
        <span>{visitDetails?.description}</span>
      </>
    </Popup>
    <button className="visit-entry" onClick={() => {
      setVisitDetails({
        start: date, description: "TESTOWANIE", patient: {
          id: 20,
          dateOfBirth: new Date(2002, 10, 10),
          insuranceNumber: "111000111",
          middleName: "Adam",
          firstName: "Jarosław",
          phoneNumber: "123-456-789",
          placeOfBirth: "Katowice",
          sex: "MALE",
          socialSecurityNumber: "1020213213",
          surname: "Adamski",
          address: {
            id: 1,
            apartmentNumber: 24,
            city: "Katowice",
            country: "Poland",
            houseNumber: "11A",
            postalCode: "40-123",
            street: "Glowna",
          },
        }
      })
    }}>VISIT</button>
  </>

  else if (!visit && doctor) return;
  else
    return (
      <Link to="/add-visit" onClick={() => { setAppointmentDate(date) }}>
        <button className="visit-entry empty-entry">ADD VISIT</button>
      </Link>
    );
}
