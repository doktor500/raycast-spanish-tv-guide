import { DateTime, Duration } from "luxon";

const TIME_ZONE = "Europe/Madrid";

const oneDay = Duration.fromObject({ day: 1 });
const currentDate = () => now().toISOString().substring(0, 11);

const getTime = (date: Date) => DateTime.fromJSDate(date).setZone(TIME_ZONE).toLocaleString(DateTime.TIME_24_SIMPLE);
const now = () => DateTime.now().setZone(TIME_ZONE, { keepLocalTime: true }).toJSDate();
const parseTime = (time: string) => DateTime.fromISO(`${currentDate()}${time}`).setZone(TIME_ZONE, { keepLocalTime: true }).toJSDate();
const plusOneDay = (date: Date) => DateTime.fromJSDate(date).setZone(TIME_ZONE, { keepLocalTime: true }).plus(oneDay).toJSDate();

export { getTime, now, parseTime, plusOneDay };
