import React, { useEffect, useState } from "react";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

import { Doctor, fetchDoctorList, } from "../../../API/Doctors";

const doctorAtom = atom<Doctor | undefined>(undefined)
const dateAtom = atom<Date>(new Date())

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
  const doctor = useAtomValue(doctorAtom)
  const currentDate = useAtomValue(dateAtom)

  return (
    <>
      <div style={{ "display": "flex", height: "40px" }}>
        <div style={{ "width": "30%" }}>
          <DoctorSelector></DoctorSelector>
        </div>
        <div style={{ "width": "400px" }}>
          {doctor && <WeekSelector></WeekSelector>}
        </div>
      </div>

      {doctor?.appointments.filter(appointment =>
        appointment.start.toISOString().split('T')[0] >= startOfWeek(currentDate) &&
        appointment.start.toISOString().split('T')[0] <= endOfWeek(currentDate)
      ).map((visit, id) => {
        return (
          <div key={id}>
            <h1>{visit.start.toISOString()}</h1>
          </div>
        )
        
      })}
      {doctor && <CalendarContent></CalendarContent>}
    </>
  )
}

function WeekSelector() {
  const [currentDate, setCurrentDate] = useAtom<Date>(dateAtom);

  return <>
    <div style={{ "display": "flex" }}>
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
  const setDoctor = useSetAtom(doctorAtom)
  const [doctorList, setDoctorList] = useState<Array<Doctor>>([])

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
            setDoctor(doctorList.filter(x => x.id === parseInt((event.target.value)))[0])
          }}>
          <option value="" disabled hidden>Select from list</option>
          {doctorList.map((doctor, id) => {
            return (<option key={id} value={doctor.id}>{`${doctor.firstName} ${doctor.lastName}`}</option>)
          })}
        </select></label>

    </>
  )
}

function CalendarContent() {
  const currentDate = useAtomValue(dateAtom)
  const numberToHour: Array<string> = [];
  const dayToDate: Array<string> = [];
  const startDate = new Date(currentDate)
  startDate.setDate(startDate.getDate() - startDate.getDay() + 1);

  for (let i = 0; i < 5; i++) {
    dayToDate[i] = startDate.toISOString().split('T')[0]
    startDate.setDate(startDate.getDate() + 1);
  }

  for (let i = 0; i < 60 * 10; i += 20) {
    const hour = Math.floor(i / 60) + 8;
    const minute = (i % 60).toString().padStart(2, '0');
    const timeString = `${hour.toString().padStart(2, '0')}:${minute}`;

    numberToHour[i / 20] = timeString;
  }

  return (<table>
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
          <td key={0}>{valueHour}</td>
          {dayToDate.map((valueDate, id) => {
            return <td key={id + 1}><EntryButton hour={valueHour} date={valueDate}/></td>
          })}

        </tr>
      })
    }
  </tbody>
  </table >)
}

type ButtonProps = {
  hour: string,
  date: string
}

function EntryButton(props: ButtonProps) {
  return (<button onClick={() => {console.log(new Date(`${props.date}T${props.hour}:00`))}}>TEST</button>)
}