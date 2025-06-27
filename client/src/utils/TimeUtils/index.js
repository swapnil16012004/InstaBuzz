import {
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
  differenceInYears,
} from "date-fns";

export function getShortInstabuzTime(date) {
  const now = new Date();

  const mins = differenceInMinutes(now, date);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m`;

  const hours = differenceInHours(now, date);
  if (hours < 24) return `${hours}h`;

  const days = differenceInDays(now, date);
  if (days < 7) return `${days}d`;

  const weeks = differenceInWeeks(now, date);
  if (weeks < 52) return `${weeks}w`;

  const years = differenceInYears(now, date);
  return `${years}y`;
}
