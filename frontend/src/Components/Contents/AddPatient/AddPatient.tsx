import React from 'react';
import "./AddPatient.css";

export default function AddPatient() {

  return (
    <>
      <div className="add-patient-container">
        <h1 className="add-patient-header">Insert patient Data</h1>
        <form action="" className="add-patient-form">
          <fieldset >
            <legend>Administrative Information</legend>
            <div className='fieldset-row'>
              <div className="form-group float-left">
                <label htmlFor="ssn-number">Social Security Number:</label>
                <input type="text" name="ssn-number" id="ssn-number" placeholder="e.g. 000111222" />
              </div>

              <div className="form-group">
                <label htmlFor="insurance-number">Insurance Number:</label>
                <input type="text" name="insurance-number" id="insurance-number" placeholder="e.g. 333444555" />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Basic Information</legend>
            <div className='fieldset-row'>
              <div className="form-group float-left">
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" id="name" placeholder="e.g. Jon" />
              </div>

              <div className="form-group float-left">
                <label htmlFor="middle-name">Middle Name:</label>
                <input type="text" name="middle-name" id="middle-name" placeholder="e.g. Aegon" />
              </div>
              
              <div className="form-group">
                <label htmlFor="surname">Surname:</label>
                <input type="text" name="surname" id="surname" placeholder="e.g. Snow" />
              </div>
            </div>

            <div className='fieldset-row'>
              <div className="form-group">
                <label htmlFor="gender">Sex:</label>
                <input type="text" name="sex" id="gender" placeholder="e.g. male" />
              </div>
            </div>

            <div className='fieldset-row'>
              <div className="form-group float-left">
                <label htmlFor="date-of-birth">Date of Birth:</label>
                <input type="date" name="date-of-birth" id="date-of-birth"/>
              </div>

              <div className="form-group">
                <label htmlFor="place-of-birth">Place of Birth:</label>
                <input type="text" name="place-of-birth" id="place-of-birth" placeholder="e.g. Winterfell" />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Contact</legend>
            <div className='fieldset-row'>
              <div className="form-group">
                <label htmlFor="phone-number">Phone Number:</label>
                <input type="text" name="phone-number" id="phone-number" placeholder="e.g. 666777888" />
              </div>
            </div>
            
            <div className='fieldset-row'> 
              <div className="form-group float-left">
                <label htmlFor="street">Street:</label>
                <input type="text" name="street" id="street" placeholder="e.g. frozen" />
              </div>

              <div className="form-group float-left">
                <label htmlFor="house-number">House Number:</label>
                <input type="text" name="house-number" id="house-number" placeholder="e.g. 5" />
              </div>
            
              <div className="form-group">
                <label htmlFor="apartment-number">Apartment Number:</label>
                <input type="text" name="apartment-number" id="apartment-number" placeholder="e.g. 5A" />
              </div>
            </div>

            <div className='fieldset-row'>
              <div className="form-group float-left">
                <label htmlFor="postal-code">Postal Code:</label>
                <input type="text" name="postal-code" id="postal-code" placeholder="e.g. 43-175" />
              </div>
              
              <div className="form-group">
                <label htmlFor="city">City:</label>
                <input type="text" name="city" id="city" placeholder="e.g. Winterfell" />
              </div>
            </div>

            <div className='fieldset-row'>
              <div className="form-group">
                <label htmlFor="country">Country:</label>
                <input type="text" name="country" id="country" placeholder="e.g. Westeros" />
              </div>
            </div>
          </fieldset>
        </form>
        <div className='add-patient-button-div'>
          <button className='add-patient-button'>Submit Data</button>
        </div>
      </div>
    </>
  );
}