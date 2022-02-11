export function prettifyDate(time) {
  return new Date(time).toLocaleDateString();
}

export function prettifyTime(time) {
  if (!time) return "Invalid Time";
  const date = new Date(time);

  let hours = date.getHours();

  // determine pmAm *before* converting hours from military time,
  // otherwise it won't be accurate:
  let pmAm = hours > 12 ? "pm" : "am";
  if (hours === 12) pmAm = "pm";
  if (hours === 0) pmAm = "am";

  // convert hours to from military time to uh *other* time
  if (hours !== 12) hours = hours % 12;
  if (hours === 0) hours = 12;

  let minutes = date.getMinutes();
  if (minutes < 10) minutes = `0${minutes}`; // add leading 0 if it is missing!

  return `${hours}:${minutes}${pmAm}`;
}
