import { useState } from "react";
import styles from "./EventCard.module.css";
import S3Image from "./S3Image";

export default function EventCard({
  title,
  time,
  entryFee,
  imgKey,
  details,
  googleMapUrl,
  eventSlug,
}) {
  const [infoToggle, setInfoToggle] = useState(false);

  function prettifyDate() {
    return new Date(time).toLocaleDateString();
  }

  function prettifyTime() {
    if (!time) return "Invalid Time";
    const date = new Date(time);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let pmAm = hours > 12 ? "pm" : "am";
    return `${hours % 12}:${minutes}${pmAm}`;
  }

  return (
    <div className={`${styles.cardContainer} p-3 mx-auto`}>
      <div className="mt-1 text-center">
        <h3>{title}</h3>
      </div>
      <div>
        <S3Image imageKey={imgKey} />
      </div>
      <div className="mx-auto text-center">
        <div className="d-inline-block mx-3 mt-3">{prettifyDate()}</div>
        <div className="d-inline-block mx-3 mt-3">{prettifyTime()}</div>
        <div className="d-inline-block mx-3 mt-3 border rounded bg-light px-3">
          {googleMapUrl && <a href={googleMapUrl}>Directions</a>}
        </div>
        <div className="d-inline-block mx-3 mt-3">
          {entryFee && parseInt(entryFee) > 0 ? `$${entryFee}` : "No Fee"}
        </div>
      </div>
      <div className={`mt-3 mx-auto`}>
        {infoToggle && <div className="mb-3">{details}</div>}

        {details && (
          <button
            onClick={() => setInfoToggle(!infoToggle)}
            type="button"
            className="rounded bg-light p-2"
          >
            {infoToggle === false ? "More Info" : "Less Info"}
          </button>
        )}

        {/* <a className="mx-3" href={`/${eventSlug}`}>
          <u>Event Store</u>
        </a> */}
      </div>
    </div>
  );
}
