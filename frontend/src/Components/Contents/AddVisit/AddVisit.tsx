import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAtom, useAtomValue } from "jotai";

import { doctorAtom, appointmentDateAtom } from "../../Common/GlobalStates";

import { Doctor, fetchAvailableDoctorList } from "../../../API/Doctors";
import { Patient, fetchFilteredPatientList } from "../../../API/Patients";

import "./AddVisit.css";

type VisitDetails = {
  date: Date | undefined;
  description: string | undefined;
};

export default function AddVisit() {
  const [selectedPatient, setSelectedPatient] = useState<Patient>();
  const [selectedDoctor, setSelectedDoctor] = useAtom(doctorAtom);
  const [visitDetails, setVisitDetails] = useState<VisitDetails>();
  const [appointmentDate, setAppointmentDate] = useAtom(appointmentDateAtom);


  useEffect(() => {
    !selectedDoctor && setSelectedDoctor(undefined)
  }, [visitDetails?.date, selectedPatient])

  useEffect(() => {
    console.log(appointmentDate)
    setVisitDetails(undefined)
    if (appointmentDate)
      setVisitDetails({
        date: appointmentDate,
        description: ""
      })
  }, [selectedPatient])

  return (
    <>
      <div className="add-visit-header">
        <Link to={"/calendar"}><button className="add-patient-button">Back</button></Link>
        <p>{appointmentDate.toUTCString().split(' ').splice(0, 5).join(' ')}</p>
        {/* TO DO: Apply backend below */}
        <button className="add-patient-button" onClick={() => { console.log(appointmentDate); console.log(selectedPatient); console.log(selectedDoctor) }}>Add visit</button>
      </div>
      <div className="add-visit-container">
        {selectedPatient ? (
          <div className="add-visit-child">
            <PatientDetails
              patient={selectedPatient}
              patientDispatcher={setSelectedPatient}
            />
          </div>
        ) : (
          <div className="add-visit-child">
            <PatientSelector
              patient={selectedPatient}
              patientDispatcher={setSelectedPatient}
            />
          </div>
        )}
        {!selectedDoctor ?
          <div className="add-visit-child">
            <DoctorSelector date={visitDetails?.date!} doctorDispatcher={setSelectedDoctor} />
          </div>
          :
          <div className="add-visit-child">
            <DoctorDetails doctor={selectedDoctor} doctorDispatcher={setSelectedDoctor} />
          </div>
        }
        <div className="add-visit-child">
          <VisitDetailsSelector setVisitDetails={setVisitDetails} />
        </div>
      </div >
    </>
  );
}

type PatientSelectorProps = {
  patient: Patient | undefined;
  patientDispatcher: React.Dispatch<React.SetStateAction<Patient | undefined>>;
};

function PatientSelector(props: PatientSelectorProps) {
  const [searchFirstName, setSearchFirstName] = useState<string>("");
  const [searchLastName, setSearchLastName] = useState<string>("");
  const [searchSSN, setSearchSSN] = useState<string>("");
  const [patientsList, setPatientsList] = useState<Patient[]>([]);

  return (
    <>
      <fieldset className="patient-selector-fieldset">
        <legend>Find patient</legend>
        <div className="visit-form-group">
          <label htmlFor="ssn-number">Social Security Number:</label>
          <input
            type="text"
            name="ssn-number"
            id="ssn-number"
            value={searchSSN}
            onChange={(event) => {
              setSearchSSN(event.target.value);
            }}
          />
        </div>
        <div className="visit-form-group">
          <label htmlFor="first-name">First name:</label>
          <input
            type="text"
            name="first-name"
            id="first-name"
            value={searchFirstName}
            onChange={(event) => {
              setSearchFirstName(event.target.value);
            }}
          />
        </div>
        <div className="visit-form-group">
          <label htmlFor="last-name">Last name:</label>
          <input
            type="text"
            name="last-name"
            id="last-name"
            value={searchLastName}
            onChange={(event) => {
              setSearchLastName(event.target.value);
            }}
          />
        </div>
        <div className="find-patient-button-container">
          <button
            className="add-patient-button"
            onClick={() => {
              fetchFilteredPatientList(
                searchSSN,
                searchFirstName,
                searchLastName,
                setPatientsList
              );
            }}
          >
            Find
          </button>
        </div>
      </fieldset>

      {patientsList.length > 0 && (
        <div className="visit-table-container">
          <table className="visit-patient-table">
            <thead>
              <tr>
                <th>SSN</th>
                <th>Last name</th>
                <th>First name</th>
              </tr>
            </thead>
            <tbody>
              {patientsList.map((value, id) => {
                return (
                  <tr
                    key={id.toString()}
                    className={`patients-table-row ${id % 2 === 0 && "row-odd"
                      } clickable-row`}
                    onClick={() => {
                      props.patientDispatcher(patientsList[id]);
                    }}
                  >
                    <td>{value.socialSecurityNumber}</td>
                    <td>{value.name}</td>
                    <td>{value.surname}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

type PatientDetailsProps = {
  patient: Patient;
  patientDispatcher: React.Dispatch<React.SetStateAction<Patient | undefined>>;
};

function PatientDetails(props: PatientDetailsProps) {
  return (
    <>
      <fieldset>
        <legend>Patient's details</legend>
        <div className="visit-form-group">
          <p><b>First name:</b></p> 
          <p>{props.patient.name}</p>
        </div>
        <div className="visit-form-group">
          <p><b>Last name:</b></p> 
          <p>{props.patient.surname}</p>
        </div>
        <div className="visit-form-group">
          <p><b>SSN:</b></p> 
          <p>{props.patient.socialSecurityNumber}</p>
        </div>
        <div className="visit-form-group">
          <p><b>Phone number:</b></p> 
          <p>{props.patient.phoneNumber}</p>
        </div>
        <div className="add-visit-button-container">
          <button
            className="add-patient-button add-visit-button"
            onClick={() => props.patientDispatcher(undefined)}>
            Change patient
          </button>
        </div>
      </fieldset>
    </>
  );
}

type VisitDetailsSelectorProps = {
  setVisitDetails: React.Dispatch<
    React.SetStateAction<VisitDetails | undefined>
  >;
};

function VisitDetailsSelector(props: VisitDetailsSelectorProps) {
  const appointmentDate = useAtomValue(appointmentDateAtom);
  const [stateDetails, setStateDetails] = useState<VisitDetails>({
    date: undefined,
    description: undefined,
  });

  useEffect(() => {
    if (stateDetails.date) {
      props.setVisitDetails({ ...stateDetails });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateDetails]);

  return (
    <>
        <fieldset>
          <legend>Description</legend>
          <textarea
            name="description"
            id="description"
            placeholder="cough and headache"
            cols={30}
            rows={10}
            className="select-visit-description"
            onChange={(event) => {
              setStateDetails({
                ...stateDetails,
                description: event.target.value,
              });
            }}
          ></textarea>
        </fieldset>
    </>
  );
}

type DoctorSelectorProps = {
  date: Date,
  doctorDispatcher: React.Dispatch<React.SetStateAction<Doctor | undefined>>
}

function DoctorSelector(props: DoctorSelectorProps) {
  const [doctorsList, setDoctorsList] = useState<Doctor[]>([])

  useEffect(() => {
    fetchAvailableDoctorList(props.date, setDoctorsList)
  }, [props.date])

  return (
    <>
      <div className="select-doctor-container">
        <div className="visit-table-container">
          <table className="visit-patient-table">
            <thead>
              <tr>
                <th>License</th>
                <th>First Name</th>
                <th>Last Name</th>
              </tr>
            </thead>
            <tbody>
              {doctorsList.map((value, id) => {
                return (
                  <tr
                    key={id.toString()}
                    className={`patients-table-row ${id % 2 === 0 && "row-odd"
                      } clickable-row`}
                    onClick={() => {
                      props.doctorDispatcher(doctorsList[id]);
                    }}
                  >
                    <td>{value.licenseNumber}</td>
                    <td>{value.name}</td>
                    <td>{value.surname}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

type DoctorDetailsProps = {
  doctor: Doctor,
  doctorDispatcher: React.Dispatch<React.SetStateAction<Doctor | undefined>>
}
function DoctorDetails(props: DoctorDetailsProps) {
  return (
    <>
      <fieldset className="patient-details-container">
        <legend>Doctor's details</legend>
        <div className="visit-form-group">
          <p><b>First name:</b></p> 
          <p>{props.doctor.name}</p>
        </div>
        <div className="visit-form-group">
          <p><b>Last name:</b></p> 
          <p>{props.doctor.surname}</p>
        </div>
        <div className="visit-form-group">
          <p><b>License number:</b></p> 
          <p>{props.doctor.licenseNumber}</p>
        </div>
        <div className="add-visit-button-container">
          <button
            className="add-patient-button add-visit-button"
            onClick={() => props.doctorDispatcher(undefined)}>
            Change doctor
          </button>
        </div>
      </fieldset>
    </>
  );
}