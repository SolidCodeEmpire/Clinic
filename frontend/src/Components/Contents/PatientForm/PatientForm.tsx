import React from "react";


import "./PatientForm.css";
import { PatientDispatcher } from "../ViewPatients/ViewPatients";
import { Patient, createEmptyPatient } from "../../../API/Model/PatientModel";

type PatientFormProps = {
  patient: Patient | undefined
  patientDispatcher: PatientDispatcher
  disabled: boolean
}

export default function PatientForm(props: PatientFormProps) {
  const changeField = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, fieldName: string) => {
    const currentPatient = props.patient || createEmptyPatient();

    if (fieldName.startsWith("address.")) {
      const fieldNames = fieldName.split('.');

      const editedPatient = { ...currentPatient, address: {...currentPatient.address, [fieldNames[1]]: event.target.value } }
      props.patientDispatcher(editedPatient)
      return
    }
    if (fieldName.includes("date") || fieldName.includes("Date")) {
      const editedPatient = { ...currentPatient, [fieldName]: new Date(event.target.value) }
      props.patientDispatcher(editedPatient)
      return
    }
    const editedPatient = { ...currentPatient, [fieldName]: event.target.value }
      props.patientDispatcher(editedPatient)
  }

  return <>
    <form action="" className="add-patient-form">
      <fieldset >
        <legend>Administrative Information</legend>
        <div className='fieldset-row'>
          <div className="form-group float-left">
            <label htmlFor="ssn-number">Social Security Number:</label>
            <input type="text"
              name="ssn-number"
              id="ssn-number"
              value={props.patient?.socialSecurityNumber}
              disabled={props.disabled}
              onChange={(event) => changeField(event, "socialSecurityNumber")}
            />
          </div>

          <div className="form-group">
            <label htmlFor="insurance-number">Insurance Number:</label>
            <input type="text"
              name="insurance-number"
              id="insurance-number"
              value={props.patient?.insuranceNumber}
              disabled={props.disabled}
              onChange={(event) => changeField(event, "insuranceNumber")}
            />
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend>Basic Information</legend>
        <div className='fieldset-row'>
          <div className="form-group float-left">
            <label htmlFor="name">First Name:</label>
            <input type="text"
              name="firstname" id="firstname"
              value={props.patient?.firstName}
              disabled={props.disabled}
              onChange={(event) => changeField(event, "firstName")}
            />
          </div>

          <div className="form-group float-left">
            <label htmlFor="middle-name">Middle Name:</label>
            <input type="text"
              name="middle-name"
              id="middle-name"
              value={props.patient?.middleName}
              disabled={props.disabled}
              onChange={(event) => changeField(event, "middleName")}
            />
          </div>

          <div className="form-group">
            <label htmlFor="surname">Last Name:</label>
            <input type="text"
              name="lastname"
              id="lastname"
              value={props.patient?.lastName}
              disabled={props.disabled}
              onChange={(event) => changeField(event, "lastName")}
            />
          </div>
        </div>

        <div className='fieldset-row'>
          <div className="form-group">
            <label htmlFor="sex">Sex:</label>
            <select name="sex"
            id="sex"
            value={props.patient?.sex}
            disabled={props.disabled}
            onChange={(event) => changeField(event, "sex")}
            >
              <option value={"MALE"}>MALE</option>
              <option value={"FEMALE"}>FEMALE</option>
              <option value={"OTHER"}>OTHER</option>
            </select>
          </div>
        </div>

        <div className='fieldset-row'>
          <div className="form-group float-left">
            <label htmlFor="date-of-birth">Date of Birth:</label>
            <input type="date"
              name="date-of-birth"
              id="date-of-birth"
              value={props.patient && new Date(props.patient?.dateOfBirth).toISOString().split('T')[0]}
              disabled={props.disabled}
              onChange={(event) => { changeField(event, "dateOfBirth") }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="place-of-birth">Place of Birth:</label>
            <input type="text"
              name="place-of-birth"
              id="place-of-birth"
              value={props.patient?.placeOfBirth}
              disabled={props.disabled}
              onChange={(event) => changeField(event, "placeOfBirth")}
            />
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend>Contact</legend>
        <div className='fieldset-row'>
          <div className="form-group">
            <label htmlFor="phone-number">Phone Number:</label>
            <input type="text"
              name="phone-number"
              id="phone-number"
              value={props.patient?.phoneNumber}
              disabled={props.disabled}
              onChange={(event) => changeField(event, "phoneNumber")}
            />
          </div>
        </div>

        <div className='fieldset-row'>
          <div className="form-group float-left">
            <label htmlFor="street">Street:</label>
            <input type="text"
              name="street"
              id="street"
              value={props.patient?.address.street}
              disabled={props.disabled}
              onChange={(event) => changeField(event, "address.street")}
            />
          </div>

          <div className="form-group float-left">
            <label htmlFor="house-number">House Number:</label>
            <input type="text"
              name="house-number"
              id="house-number"
              value={props.patient?.address.houseNumber}
              disabled={props.disabled}
              onChange={(event) => changeField(event, "address.houseNumber")}
            />
          </div>

          <div className="form-group">
            <label htmlFor="apartment-number">Apartment Number:</label>
            <input type="text"
              name="apartment-number"
              id="apartment-number"
              value={props.patient?.address.apartmentNumber}
              disabled={props.disabled}
              onChange={(event) => changeField(event, "address.apartmentNumber")}
            />
          </div>
        </div>

        <div className='fieldset-row'>
          <div className="form-group float-left">
            <label htmlFor="postal-code">Postal Code:</label>
            <input type="text"
              name="postal-code"
              id="postal-code"
              value={props.patient?.address.postalCode}
              disabled={props.disabled}
              onChange={(event) => changeField(event, "address.postalCode")}
            />
          </div>

          <div className="form-group">
            <label htmlFor="city">City:</label>
            <input type="text"
              name="city" id="city"
              value={props.patient?.address.city}
              disabled={props.disabled}
              onChange={(event) => changeField(event, "address.city")}
            />
          </div>
        </div>

        <div className='fieldset-row'>
          <div className="form-group">
            <label htmlFor="country">Country:</label>
            <input type="text"
              name="country"
              id="country"
              value={props.patient?.address.country}
              disabled={props.disabled}
              onChange={(event) => changeField(event, "address.country")}
            />
          </div>
        </div>
      </fieldset>
    </form>
  </>;
}