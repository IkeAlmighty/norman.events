export function prettifyDate(time) {
  return new Date(time).toLocaleDateString();
}

export function prettifyTime(time) {
  if (!time) return "Invalid Time";
  const date = new Date(time);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) minutes = `0${minutes}`; // add leading 0 if it is missing!
  let pmAm = hours > 12 ? "pm" : "am";
  return `${hours % 12}:${minutes}${pmAm}`;
}
