import styles from "./EventCard.module.css";

export default function EventCard({
  title,
  time,
  entryFee,
  imgUrl,
  details,
  googleMapUrl,
  eventSlug,
}) {
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
        <img src={imgUrl} className={styles.cardImage} alt="not loaded" />
      </div>
      <div className="mx-auto text-center">
        <div className="d-inline-block mx-3 mt-3">{prettifyDate()}</div>
        <div className="d-inline-block mx-3 mt-3">{prettifyTime()}</div>
        <div className="d-inline-block mx-3 mt-3 border rounded bg-light px-3">
          {googleMapUrl && <a href={googleMapUrl}>Directions</a>}
        </div>
        <div className="d-inline-block mx-3 mt-3">
          {entryFee ? `$${entryFee}` : "No Fee"}
        </div>
      </div>
      <div className={`mt-3 mx-auto text-center`}>
        <a href={`/${eventSlug}`}>
          <button className="rounded bg-light">More Info</button>
        </a>
      </div>
    </div>
  );
}
