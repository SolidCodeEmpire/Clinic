import React from "react";

export function getStartOfWeek(date: Date) {
  const startDate = new Date(date);
  const day = startDate.getDay();
  const diff = startDate.getDate() - day + 2; // Adjust when day is Sunday
  startDate.setDate(diff);
  return startDate;
}
export function startOfWeek(currentDate: Date) {
  const startDate = new Date(currentDate);
  startDate.setDate(startDate.getDate() - startDate.getDay() + 2);
  return startDate;
}
export function endOfWeek(currentDate: Date) {
  const endDate = new Date(currentDate);
  endDate.setDate(endDate.getDate() + 7 - endDate.getDay() - 1);
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
