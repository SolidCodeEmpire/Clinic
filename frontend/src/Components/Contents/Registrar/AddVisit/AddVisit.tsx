import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAtom, useAtomValue } from "jotai";
import "./AddVisit.css";

import { Patient } from "../../../../API/Model/PatientModel";
import { submitAppointment } from "../../../../API/Service/AppointmentService";
import { fetchFilteredPatientList } from "../../../../API/Service/PatientService";
import { Doctor } from "../../../../API/Model/DoctorModel";
import { appointmentDateAtom, doctorAtom } from "../../../Common/GlobalStates";


export default function AddVisit() {
  const [selectedPatient, setSelectedPatient] = useState<Patient>();
  const [selectedDoctor, setSelectedDoctor] = useAtom(doctorAtom);
  const [description, setDescription] = useState<string>();
  const [appointmentDate, setAppointmentDate] = useAtom(appointmentDateAtom);

  return (
    <>
      <div className="add-visit-header">
        <Link to={"/calendar"}><button className="primary-button">Back</button></Link>
        <p>{appointmentDate.toUTCString().split(' ').splice(0, 5).join(' ')}</p>
        <button className="primary-button" onClick={() => { 
          if (!(selectedPatient && selectedDoctor && description)) {
            alert("Not all fields are filled!");
            return;
          }
          submitAppointment(selectedPatient, selectedDoctor, appointmentDate, description);
          }}>Add visit</button>
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
        {selectedDoctor &&
          <div className="add-visit-child">
            <DoctorDetails doctor={selectedDoctor} doctorDispatcher={setSelectedDoctor} />
          </div>
        }
        <div className="add-visit-child">
          <VisitDetailsSelector setDescription={setDescription} />
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
            className="primary-button"
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
                <th>First name</th>
                <th>Last name</th>
              </tr>
            </thead>
            <tbody>
              {patientsList?.map((value, id) => {
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
                    <td>{value.firstName}</td>
                    <td>{value.lastName}</td>
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
          <p>{props.patient.firstName}</p>
        </div>
        <div className="visit-form-group">
          <p><b>Last name:</b></p> 
          <p>{props.patient.lastName}</p>
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
            className="primary-button add-visit-button"
            onClick={() => props.patientDispatcher(undefined)}>
            Change patient
          </button>
        </div>
      </fieldset>
    </>
  );
}

type DescriptionSelectorProps = {
  setDescription: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
};

function VisitDetailsSelector(props: DescriptionSelectorProps) {
  const [description, setDescription] = useState<string>()

  useEffect(() => {
    if (description) {
      props.setDescription(description);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [description]);

  return (
    <>
        <fieldset>
          <legend>Description</legend>
          <textarea
            name="description"
            id="description"
            cols={30}
            rows={10}
            className="select-visit-description"
            onChange={(event) => {
              setDescription(event.target.value)
              props.setDescription(event.target.value)
            }}
          ></textarea>
        </fieldset>
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
          <p>{props.doctor.firstName}</p>
        </div>
        <div className="visit-form-group">
          <p><b>Last name:</b></p> 
          <p>{props.doctor.lastName}</p>
        </div>
        <div className="visit-form-group">
          <p><b>License number:</b></p> 
          <p>{props.doctor.licenseNumber}</p>
        </div>
      </fieldset>
    </>
  );
}