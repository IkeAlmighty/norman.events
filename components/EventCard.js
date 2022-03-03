import { useEffect, useState } from "react";
import styles from "./EventCard.module.css";
import S3Image from "./S3Image";
import { marked } from "marked";
import { prettifyDate, prettifyTime } from "../utils/datetime";

export default function EventCard({
  title,
  time,
  endTime,
  entryFee,
  imgKey,
  details,
  googleMapUrl,
  eventSlug,
}) {
  const [infoToggle, setInfoToggle] = useState(false);
  const [eventIsLessThanADay, setEventIsLessThanADay] = useState(true);

  useEffect(() => {
    if (!time || !endTime) return;
    const timeEpochSeconds = new Date(time).getTime();
    const endTimeEpochSeconds = new Date(endTime).getTime();

    const diff = endTimeEpochSeconds - timeEpochSeconds;
    console.log(diff); //FIXME: this don't work for some reason
    if (diff < 0) return; // TODO: add an error message that start time after end time

    setEventIsLessThanADay(diff < 24 * 60 * 60 * 1000);
  }, [time, endTime]);

  function getDetailsMarkup() {
    return { __html: marked(details) };
  }

  return (
    <div className={`${styles.cardContainer} p-3 mx-auto`}>
      <div className="mt-1 text-center">
        <a href={`/${eventSlug}`}>
          <h3>{title}</h3>
        </a>
      </div>
      {imgKey && (
        <div>
          <S3Image imageKey={imgKey} />
        </div>
      )}
      <div className={`mt-3 mx-auto`}>
        {/* FIXME: This could expose the site to Cross Site Scripting attacks */}
        {infoToggle && (
          <div
            className={`mb-3 ${styles.detailsMarkup}`}
            dangerouslySetInnerHTML={getDetailsMarkup()}
          />
        )}

        {details && (
          <div className="text-center">
            <a
              onClick={() => setInfoToggle(!infoToggle)}
              role="button"
              className="rounded bg-light px-2"
            >
              {infoToggle === false ? "..." : "Less"}
            </a>
          </div>
        )}

        {/* <a className="mx-3" href={`/${eventSlug}`}>
          <u>Go To Event Page</u>
        </a> */}
      </div>
      <div className="mx-auto text-center">
        <div className="d-inline-block mx-3 mt-3">{prettifyDate(time)}</div>
        <div className="d-inline-block mx-3 mt-3">
          {prettifyTime(time)}
          {endTime && eventIsLessThanADay && ` - ${prettifyTime(endTime)}`}
        </div>
        <div className="d-inline-block mx-3 mt-3 border rounded bg-light px-3">
          {googleMapUrl && <a href={googleMapUrl}>Directions</a>}
        </div>
        <div className="d-inline-block mx-3 mt-3">
          {entryFee && parseInt(entryFee) > 0
            ? `$${parseFloat(entryFee).toFixed(2)}`
            : "No Fee"}
        </div>
      </div>
    </div>
  );
}
