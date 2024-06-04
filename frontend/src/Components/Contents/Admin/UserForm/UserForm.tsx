import { ClinicUser } from "../../../../API/Model/ClinicUserModel";
import "./UserForm.css";

type UserFormProps = {
  user: ClinicUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<ClinicUser | undefined>>
};

export default function UserForm(props: UserFormProps) {
  return (
    <form action="">
      <div className="user-form-row">
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          placeholder="first name"
          disabled={props.user === undefined}
          value={props.user ? props.user.firstName : ""}
          onChange={(event) =>
            props.user &&
            props.setUser({
              ...props.user,
              firstName: event.target.value,
            })
          }
        />
      </div>
      <div className="user-form-row">
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          placeholder="last name"
          disabled={props.user === undefined}
          value={props.user ? props.user.lastName : ""}
          onChange={(event) =>
            props.user &&
            props.setUser({
              ...props.user,
              lastName: event.target.value,
            })
          }
        />
      </div>
      <div className="user-form-row">
        <label htmlFor="email">E-mail:</label>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="e-mail"
          disabled={props.user === undefined}
          value={props.user ? props.user.email : ""}
          onChange={(event) =>
            props.user &&
            props.setUser({
              ...props.user,
              email: event.target.value,
            })
          }
        />
      </div>
      <div className="user-form-row">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="username"
          disabled={props.user === undefined}
          value={props.user ? props.user.username : ""}
          onChange={(event) =>
            props.user &&
            props.setUser({
              ...props.user,
              username: event.target.value,
            })
          }
        />
      </div>
      <div className="user-form-row">
        <label htmlFor="password">Password:</label>
        <input
          type="text"
          name="password"
          id="password"
          placeholder="password"
          disabled={props.user === undefined}
          value={props.user ? props.user.password != null ? props.user.password : "" : ""}
          onChange={(event) =>
            props.user &&
            props.setUser({
              ...props.user,
              password: event.target.value,
            })
          }
        />
      </div>
      <div className="user-form-row">
        <label htmlFor="userType">User Type:</label>
        <select
          name="userType"
          id="userType"
          disabled={props.user === undefined}
          onChange={(event) => {
            props.user &&
              props.setUser({
                ...props.user,
                userType: event.target.value,
                licenseNumber: undefined,
              });
          }}
        >
          {[
            "MEDICAL_REGISTRAR",
            "DOCTOR",
            "LAB_TECHNICIAN",
            "LAB_SUPERVISOR",
            "ADMIN"
          ].map((role) => {
            return (
              <option
                value={role}
                selected={role === (props.user ? props.user.userType : "MEDICAL_REGISTRAR")}
              >
                {role}
              </option>
            );
          })}
        </select>
      </div>
      {props.user?.userType === "DOCTOR" && (
        <div className="user-form-row">
          <label htmlFor="licenseNumber">License Number:</label>
          <input
            type="text"
            name="licenseNumber"
            id="licenseNumber"
            disabled={props.user === undefined}
            value={props.user.licenseNumber}
            onChange={(event) =>
              props.user &&
              props.setUser({
                ...props.user,
                licenseNumber: event.target.value,
              })
            }
          />
        </div>
      )}
    </form>
  );
}
