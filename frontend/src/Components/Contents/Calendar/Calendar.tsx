import React, { useEffect, useState } from "react";
import { Popup } from 'reactjs-popup'
import { Link } from "react-router-dom";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

import { fetchDoctorList } from "../../../API/Service/DoctorService";
import { doctorAtom, dateAtom, appointmentDateAtom } from "../../Common/GlobalStates";

import "./Calendar.css";
import { ClockComponent } from "../../Common/Clock";
import { Doctor } from "../../../API/Model/DoctorModel";
import { Patient } from "../../../API/Model/PatientModel";


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
  const doctor = useAtomValue(doctorAtom);

  const [numberToHour, setNumberToHour] =  useState<Array<string>>([]);
  const [dayToDate, setDayToDate] = useState<Array<string>>([]);

  useEffect(() => {
    let startDate = new Date(currentDate);
    mapTimeToIndexedValues(setDayToDate, getStartOfWeek(startDate), setNumberToHour);
  }, [currentDate]);

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
                const visit = doctor?.appointments.some(appointment => 
                  new Date(appointment.registeredDate).toISOString() === dateString
                ) ?? false;
  
                  return (
                  <td key={dateIndex + 1} className="time-table-normal-cell">
                    <EntryButton date={date} visit={visit} doctor={props.doctor}></EntryButton>
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

function getStartOfWeek(date : Date) {
  const startDate = new Date(date);
  const day = startDate.getDay();
  const diff = startDate.getDate() - day + 2; // Adjust when day is Sunday
  startDate.setDate(diff);
  return startDate;
}

function startOfWeek(currentDate: Date) {
  const startDate = new Date(currentDate);
  startDate.setDate(startDate.getDate() - startDate.getDay() + 2);
  return startDate.toISOString().split("T")[0];
}

function endOfWeek(currentDate: Date) {
  const endDate = new Date(currentDate);
  endDate.setDate(endDate.getDate() + 7 - endDate.getDay() - 1);
  return endDate.toISOString().split("T")[0];
}

function mapTimeToIndexedValues(
  setDayToDate: React.Dispatch<React.SetStateAction<string[]>>,
  startDate: Date,
  setNumberToHour: React.Dispatch<React.SetStateAction<string[]>>
) {
  let dayToDate=[]
  for (let i = 0; i < 5; i++) {
    dayToDate[i] = startDate.toISOString().split("T")[0];
    startDate.setDate(startDate.getDate() + 1);
  }
  setDayToDate(dayToDate);

  const numberToHour = Array.from({ length: 20 }, (_, i) => {
    const hour = Math.floor(i / 2) + 8;
    const minute = (i % 2 === 0) ? '00' : '30';
    return `${hour.toString().padStart(2, '0')}:${minute}`;
  });
  setNumberToHour(numberToHour);
}

type Visit = {
  start: Date;
  description: string;
  patient: Patient;
}

type EntryButtonProps = {date: Date, visit: boolean, doctor: Doctor | undefined}

function EntryButton(props : EntryButtonProps) {
  const setAppointmentDate = useSetAtom(appointmentDateAtom)
  const [visitDetails, setVisitDetails] = useState<Visit | undefined>()

  if (props.visit) return <>
    <Popup open={visitDetails !== undefined} onClose={() => setVisitDetails(undefined)}>
      <>
        <h1>{visitDetails?.start.toUTCString().split(' ').splice(0, 5).join(' ')}</h1>
        <p>Patient:</p>
        <span>
          {`${visitDetails?.patient.firstName} ${visitDetails?.patient.lastName}`}
        </span>
        <p>Description:</p>
        <span>{visitDetails?.description}</span>
      </>
    </Popup>
    <button className="visit-entry" onClick={() => {
      setVisitDetails({
        start: props.date, description: "TESTOWANIE", patient: {
          id: 20,
          dateOfBirth: new Date(2002, 10, 10),
          insuranceNumber: "111000111",
          middleName: "Adam",
          firstName: "Jarosław",
          phoneNumber: "123-456-789",
          placeOfBirth: "Katowice",
          sex: "MALE",
          socialSecurityNumber: "1020213213",
          lastName: "Adamski",
          status: "REGISTERED",
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

  else if (!props.visit && props.doctor) return <></>;
  else
    return (
      <Link to="/add-visit" onClick={() => { setAppointmentDate(props.date) }}>
        <button className="visit-entry empty-entry">ADD VISIT</button>
      </Link>
    );
}

