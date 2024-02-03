import { format, addMinutes, setHours, setMinutes } from "date-fns";

export function generateDayTimeList(date: Date): string[] {
  const startTime = setMinutes(setHours(date, 9), 0); //primeira  hora do dia (9h)
  const endTime = setMinutes(setHours(date, 21), 0); //ultima  hora do dia (21h)
  const interval = 45; //intervalo  de 45 minutos entre as horas disponiveis
  const timeList: string[] = [];

  let currentTime = startTime;

  while (currentTime <= endTime) {
    timeList.push(format(currentTime, "HH:mm"));
    currentTime = addMinutes(currentTime, interval);
  }
  return timeList;
}
