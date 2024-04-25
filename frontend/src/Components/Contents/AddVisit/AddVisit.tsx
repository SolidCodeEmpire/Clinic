import React, { useState, useEffect } from "react";
import "./AddVisit.css";
import { Patient, fetchFilteredPatientList } from "../../../API/Patients";

type VisitDetails = {
  date: Date | undefined;
  description: string | undefined;
};

export default function AddVisit() {
  const [selectedPatient, setSelectedPatient] = useState<Patient>();
  const [visitDetails, setVisitDetails] = useState<VisitDetails>();

  return (
    <>
      <div className="add-visit-container">
        <div className="add-visit-child">
          {selectedPatient ? (
            <PatientDetails
              patient={selectedPatient}
              patientDispatcher={setSelectedPatient}
            />
          ) : (
            <PatientSelector
              patient={selectedPatient}
              patientDispatcher={setSelectedPatient}
            />
          )}
        </div>
        {selectedPatient && (
          <div className="add-visit-child">
            <VisitDetailsSelector setVisitDetails={setVisitDetails} />
          </div>
        )}
        {visitDetails && (
          <div className="add-visit-child">
            <DoctorSelector></DoctorSelector>
          </div>
        )}
      </div>
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
            <thead
              style={{
                backgroundColor: "var(--titlebar-color)",
                border: "1px black solid",
              }}
            >
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
                    className={`patients-table-row ${
                      id % 2 === 0 && "row-odd"
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
      <fieldset>
        <legend>Patient details</legend>
        <p>
          <b>First name:</b> {props.patient.firstName}
        </p>
        <p>Last name: {props.patient.surname}</p>
        <p>SSN: {props.patient.socialSecurityNumber}</p>
        <p>Phone number: {props.patient.phoneNumber}</p>
      </fieldset>
      <div style={{display:"flex", justifyContent:"center"}}>
        <button
        className="add-patient-button" 
        style={{width:"30%"}}
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

function DoctorSelector() {
  return (
    <>
      <h1>Select doctor</h1>
    </>
  );
}
