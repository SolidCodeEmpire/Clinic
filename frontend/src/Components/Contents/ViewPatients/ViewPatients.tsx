import React, { useState } from "react";

import './ViewPatients.css'

export default function ViewPatients() {
  const [currentPage, setCurrentPage] = useState(1)

  var patients = [{
    id: 1,
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
      apartment_number: 24,
      city: "Katowice",
      country: "Poland",
      houseNumber: "11A",
      postalCode: "40-123",
      street: "Glowna"
    }
  },
  {
    id: 2,
    dateOfBirth: new Date(2002, 10, 10),
    insuranceNumber: "111000111",
    middleName: "Adam",
    firstName: "Andrzej",
    phoneNumber: "223-456-789",
    placeOfBirth: "Katowice",
    sex: "MALE",
    socialSecurityNumber: "1020213213",
    surname: "Adamski",
    address: {
      id: 1,
      apartment_number: 24,
      city: "Katowice",
      country: "Poland",
      houseNumber: "11A",
      postalCode: "40-123",
      street: "Glowna"
    }
  },
  {
    id: 3,
    dateOfBirth: new Date(2002, 10, 10),
    insuranceNumber: "111000111",
    middleName: "Adam",
    firstName: "Zbigniew",
    phoneNumber: "323-456-789",
    placeOfBirth: "Katowice",
    sex: "MALE",
    socialSecurityNumber: "1020213213",
    surname: "Adamski",
    address: {
      id: 1,
      apartment_number: 24,
      city: "Katowice",
      country: "Poland",
      houseNumber: "11A",
      postalCode: "40-123",
      street: "Glowna"
    }
  },
  {
    id: 4,
    dateOfBirth: new Date(2002, 10, 10),
    insuranceNumber: "111000111",
    middleName: "Adam",
    firstName: "Szymon",
    phoneNumber: "423-456-789",
    placeOfBirth: "Katowice",
    sex: "MALE",
    socialSecurityNumber: "1020213213",
    surname: "Adamski",
    address: {
      id: 1,
      apartment_number: 24,
      city: "Katowice",
      country: "Poland",
      houseNumber: "11A",
      postalCode: "40-123",
      street: "Glowna"
    }
  },
  {
    id: 5,
    dateOfBirth: new Date(2002, 10, 10),
    insuranceNumber: "111000111",
    middleName: "Adam",
    firstName: "Mateusz",
    phoneNumber: "523-456-789",
    placeOfBirth: "Katowice",
    sex: "MALE",
    socialSecurityNumber: "1020213213",
    surname: "Adamski",
    address: {
      id: 1,
      apartment_number: 24,
      city: "Katowice",
      country: "Poland",
      houseNumber: "11A",
      postalCode: "40-123",
      street: "Glowna"
    }
  },
  {
    id: 6,
    dateOfBirth: new Date(2002, 10, 10),
    insuranceNumber: "111000111",
    middleName: "Adam",
    firstName: "Rafał",
    phoneNumber: "623-456-789",
    placeOfBirth: "Katowice",
    sex: "MALE",
    socialSecurityNumber: "1020213213",
    surname: "Adamski",
    address: {
      id: 1,
      apartment_number: 24,
      city: "Katowice",
      country: "Poland",
      houseNumber: "11A",
      postalCode: "40-123",
      street: "Glowna"
    }
  }]
  return (<div className="patients">
    <div className="table-navigation">
      <form className="page-navigation">
        <button type="button" onClick={() => setCurrentPage(currentPage - 1)}>{"<"}</button>
        <input type="text" placeholder={`${currentPage}`} onChange={(event) => console.log(event.target.value)} />
        <button type="button" onClick={() => setCurrentPage(currentPage + 1)}>{">"}</button>
      </form>
      <form className="find-patient">
        <input type="text" placeholder="Find patient" />
        <button>Find</button>
      </form>
    </div>
    <div>
      <table className="patients-table">
        <tbody>
          <tr>
            <th>ID</th>
            <th>SSN</th>
            <th>Last name</th>
            <th>First name</th>
            <th>Middle name</th>
            <th>Sex</th>
            <th>Phone number</th>
            <th>Date of birth</th>
            <th>Place of birth</th>
            <th>Address</th>
            <th>Insurance number</th>
          </tr>
          {patients.map((value, id) => {
            return (
              <tr key={id.toString()} className={`patients-table-row ${id % 2 === 0 && 'row-odd'}`}>
                <td>{value.id}</td>
                <td>{value.socialSecurityNumber}</td>
                <td>{value.surname}</td>
                <td>{value.firstName}</td>
                <td>{value.middleName}</td>
                <td>{value.sex}</td>
                <td>{value.phoneNumber}</td>
                <td>{value.dateOfBirth.toISOString()}</td>
                <td>{value.placeOfBirth}</td>
                <td>{value.address.id}</td>
                <td>{value.insuranceNumber}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  </div>
  )
}