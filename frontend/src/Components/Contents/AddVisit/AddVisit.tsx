import React, { useState, useEffect } from "react";
import "./AddVisit.css";
import { Patient, fetchFilteredPatientList } from "../../../API/Patients";
import { Doctor, fetchAvailableDoctorList } from "../../../API/Doctors";

type VisitDetails = {
  date: Date | undefined;
  description: string | undefined;
};

export default function AddVisit() {
  const [selectedPatient, setSelectedPatient] = useState<Patient>();
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor>();
  const [visitDetails, setVisitDetails] = useState<VisitDetails>();

  useEffect(() => {
    setSelectedDoctor(undefined)
  }, [visitDetails?.date, selectedPatient])

  useEffect(() => {
    setVisitDetails(undefined)
  }, [selectedPatient])
  return (
    <>
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
        {selectedPatient && (
          <div className="add-visit-child">
            <VisitDetailsSelector setVisitDetails={setVisitDetails} />
          </div>
        )}
          {selectedPatient && visitDetails && (
            !selectedDoctor ? 
            <div className="add-visit-child">
              <DoctorSelector date={visitDetails.date!} doctorDispatcher={setSelectedDoctor}/> 
            </div>
            : 
            <div className="add-visit-child">
              <DoctorDetails doctor={selectedDoctor} doctorDispatcher={setSelectedDoctor} />
            </div>
          )}
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
      <fieldset style={{ marginBottom: "20px" }}>
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
        <button
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
                    <td>{value.firstName}</td>
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
      <fieldset className="patient-details-container">
        <legend>Patient's details</legend>
        <p><b>First name:</b> {props.patient.firstName}</p>
        <p><b>Last name:</b> {props.patient.surname}</p>
        <p><b>SSN:</b> {props.patient.socialSecurityNumber}</p>
        <p><b>Phone number:</b> {props.patient.phoneNumber}</p>
      </fieldset>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          className="add-patient-button"
          style={{ width: "30%" }}
          onClick={() => props.patientDispatcher(undefined)}>
          Change patient
        </button>
      </div>
    </>
  );
}

type VisitDetailsSelectorProps = {
  setVisitDetails: React.Dispatch<
    React.SetStateAction<VisitDetails | undefined>
  >;
};

function VisitDetailsSelector(props: VisitDetailsSelectorProps) {
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
      <div className="visit-date-container">
        <fieldset>
          <legend>Select date and time</legend>
          <input
            type="datetime-local"
            name="date"
            id="date"
            placeholder={"2024-02-02T23:10"}
            onChange={(event) => {
              setStateDetails({
                ...stateDetails,
                date: new Date(event.target.value),
              });
            }}
          />
        </fieldset>
      </div>
      <div className="visit-description-container">
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
      </div>
    </>
  );
}

type DoctorSelectorProps = {
  date: Date, 
  doctorDispatcher: React.Dispatch<React.SetStateAction<Doctor | undefined>>
}

function DoctorSelector(props: DoctorSelectorProps) {
  const [doctorsList, setDoctorsList] = useState<Doctor[]>([])

  useEffect(()=> {
    fetchAvailableDoctorList(props.date, setDoctorsList)
  }, [props.date])

  return (
    <>
      <div className="select-doctor-container">
        <h2>Available doctors</h2>
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
                    <td>{value.firstName}</td>
                    <td>{value.lastName}</td>
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
        <p><b>First name:</b> {props.doctor.firstName}</p>
        <p><b>Last name:</b> {props.doctor.lastName}</p>
        <p><b>License number:</b> {props.doctor.licenseNumber}</p>
      </fieldset>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          className="add-patient-button"
          style={{ width: "30%" }}
          onClick={() => props.doctorDispatcher(undefined)}>
          Change doctor
        </button>
      </div>
    </>
  );
}