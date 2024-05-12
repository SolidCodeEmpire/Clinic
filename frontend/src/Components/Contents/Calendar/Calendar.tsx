import React, { useEffect, useState } from "react";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

import { Doctor, fetchDoctorList, } from "../../../API/Doctors";

import './Calendar.css';

const doctorAtom = atom<Doctor | undefined>(undefined)
const dateAtom = atom<Date>(new Date())
const appointmentsAtom = atom<Array<string>>([])

function startOfWeek(currentDate: Date) {
  const startDate = new Date(currentDate)
  startDate.setDate(startDate.getDate() - startDate.getDay() + 1);
  return startDate.toISOString().split('T')[0];
}

function endOfWeek(currentDate: Date) {
  const endDate = new Date(currentDate)
  endDate.setDate(endDate.getDate() + 7 - endDate.getDay());
  return endDate.toISOString().split('T')[0];
}

export default function Calendar() {
  const doctor = useAtomValue(doctorAtom);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  setTimeout(() => {setCurrentTime(new Date)}, 1000);

  return (
    <>
      <div className="selectors">
        <div className="doctor-selector">
          <DoctorSelector></DoctorSelector>
        </div>
        <div className="current-time">
          {currentTime.toLocaleString()}
        </div>
        <div className="week-selector">
          <WeekSelector></WeekSelector>
        </div>
      </div>
      {doctor && <CalendarContent></CalendarContent>}
    </>
  )
}

function WeekSelector() {
  const [currentDate, setCurrentDate] = useAtom<Date>(dateAtom);

  return <>
    <div className="week-selector-div">
      <button onClick={() => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() - 7);
        setCurrentDate(newDate);
      }}>Previous week</button>
      {`${startOfWeek(currentDate)} - ${endOfWeek(currentDate)}`}
      <button onClick={() => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + 7);
        setCurrentDate(newDate);
      }}>Next week</button>
    </div>
  </>

}

function DoctorSelector() {
  const setDoctor = useSetAtom(doctorAtom);
  const setAppointments = useSetAtom(appointmentsAtom);
  const [doctorList, setDoctorList] = useState<Array<Doctor>>([]);


  useEffect(() => {
    fetchDoctorList(setDoctorList)
  })

  return (
    <>
      <label htmlFor="select-doctor">Select doctor:
        <select name="select-doctor"
          id="select-doctor"
          defaultValue={""}
          onChange={(event) => {
            const doctor = doctorList.filter(x => x.id === parseInt((event.target.value)))[0];
            setDoctor(doctor)
            setAppointments(doctor.appointments.map((value, id) => value.start.toISOString().split('Z')[0]))
          }}>
          <option value="" disabled hidden>Select from list</option>
          {doctorList.map((doctor, id) => {
            return (<option key={id} value={doctor.id}>{`${doctor.firstName} ${doctor.lastName}`}</option>)
          })}
        </select>
      </label>

    </>
  )
}

function CalendarContent() {
  const currentDate = useAtomValue(dateAtom);
  const appointments = useAtomValue(appointmentsAtom);

  const startDate = new Date(currentDate)
  const numberToHour: Array<string> = [];
  const dayToDate: Array<string> = [];

  startDate.setDate(startDate.getDate() - startDate.getDay() + 1);

  for (let i = 0; i < 5; i++) {
    dayToDate[i] = startDate.toISOString().split('T')[0]
    startDate.setDate(startDate.getDate() + 1);
  }

  for (let i = 0; i < 60 * 10; i += 30) {
    const hour = Math.floor(i / 60) + 8;
    const minute = (i % 60).toString().padStart(2, '0');
    const timeString = `${hour.toString().padStart(2, '0')}:${minute}`;

    numberToHour[i / 30] = timeString;
  }

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

          return <tr key={id.toString()}>
            <td key={0} className="time-table-hour-cell">{valueHour}</td>
            {dayToDate.map((valueDate, id) => {
              const dateString = `${valueDate}T${valueHour}:00.000`;
              const date = new Date(dateString);
              const visit = appointments.includes(dateString);
              return <td key={id + 1} className="time-table-normal-cell">{entryButton(date, visit)}</td>
            })}

          </tr>
        })
        }
      </tbody>
    </table>
  )
}

function entryButton(date: Date, visit: boolean) {
  if (visit)
    return <button onClick={() => { console.log(date) }} className="visit-entry">Visit</button>
  else
    return <button onClick={() => { console.log(date) }} className="visit-entry empty-entry">Add visit</button>
}