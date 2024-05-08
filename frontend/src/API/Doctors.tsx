export type Doctor = {
  id: number;
  firstName: string,
  lastName: string,
  licenseNumber: string,
  appointments: Array<{
    start: Date,
    end: Date
  }>
};


var doctorList: Doctor[] = [
  {
    id: 1,
    firstName: "Maciej",
    lastName: "Czechowski",
    licenseNumber: "-1",
    appointments: [
      {
        start: new Date("2024-04-25T12:20"),
        end: new Date("2024-04-25T12:35")
      },
      {
        start: new Date("2024-04-25T12:20"),
        end: new Date("2024-04-25T12:35")
      },
      {
        start: new Date("2024-04-25T12:20"),
        end: new Date("2024-04-25T12:35")
      }
    ]
  },
  {
    id: 2,
    firstName: "Dawid",
    lastName: "Jeziorski",
    licenseNumber: "-1",
    appointments: [
      {
        start: new Date("2024-04-25T12:20"),
        end: new Date("2024-04-25T12:35")
      },
      {
        start: new Date("2024-04-25T12:35"),
        end: new Date("2024-04-25T12:50")
      },
      {
        start: new Date("2024-04-25T12:20"),
        end: new Date("2024-04-25T12:35")
      }
    ]
  },
  {
    id: 3,
    firstName: "Kamil",
    lastName: "Kubina",
    licenseNumber: "-1",
    appointments: [
      {
        start: new Date("2024-04-25T12:20"),
        end: new Date("2024-04-25T12:35")
      }
    ]
  },
  {
    id: 4,
    firstName: "Pawel",
    lastName: "Ziaja",
    licenseNumber: "-1",
    appointments: [
      {
        start: new Date("2024-04-25T12:20"),
        end: new Date("2024-04-25T12:35")
      },
      {
        start: new Date("2024-04-25T12:20"),
        end: new Date("2024-04-25T12:35")
      },
      {
        start: new Date("2024-04-25T12:20"),
        end: new Date("2024-04-25T12:35")
      }
    ]
  },
  {
    id: 5,
    firstName: "Michał",
    lastName: "Pilch",
    licenseNumber: "-1",
    appointments: [
      {
        start: new Date("2024-04-26T12:20"),
        end: new Date("2024-04-26T16:00")
      }
    ]
  }
]

export type DoctorListDispatcher = React.Dispatch<
  React.SetStateAction<Doctor[]>
>
export function fetchAvailableDoctorList(date: Date, 
  doctorListDispatcher: DoctorListDispatcher) {
  doctorListDispatcher(doctorList.filter(value =>
    value.appointments.every(appointment =>
      !(appointment.start < date && date < appointment.end)
    )
  ))
}

export function fetchDoctorList(doctorListDispatcher: DoctorListDispatcher) {
  doctorListDispatcher(doctorList);
}