import React from "react";

export function startOfWeek(date: Date) {
  const startDate = new Date(date);
  const day = startDate.getDay();
  const diff = startDate.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  startDate.setDate(diff);
  startDate.setHours(6, 0);
  return startDate;
}

export function endOfWeek(currentDate: Date) {
  const endDate = new Date(currentDate);
  const startDate = startOfWeek(currentDate);
  endDate.setDate(startDate.getDate() + 4);
  endDate.setHours(20, 0);
  return endDate;
}

export function mapTimeToIndexedValues(
  setDayToDate: React.Dispatch<React.SetStateAction<string[]>>,
  startDate: Date,
  setNumberToHour: React.Dispatch<React.SetStateAction<string[]>>
) {
  let dayToDate = [];
  for (let i = 0; i < 5; i++) {
    dayToDate[i] = startDate.toISOString().split("T")[0];
    startDate.setDate(startDate.getDate() + 1);
  }
  setDayToDate(dayToDate);

  const numberToHour = Array.from({ length: 20 }, (_, i) => {
    const hour = Math.floor(i / 2) + 8;
    const minute = i % 2 === 0 ? "00" : "30";
    return `${hour.toString().padStart(2, "0")}:${minute}`;
  });
  setNumberToHour(numberToHour);
}
