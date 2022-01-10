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
    const date = new Date(time);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let pmAm = hours > 12 ? "pm" : "am";
    return `${hours % 12}:${minutes}${pmAm}`;
  }

  return (
    <a href={`/${eventSlug}`}>
      <div
        className={`${styles.cardContainer} mx-auto my-3 py-1 bg-light container`}
      >
        <div className={`${styles.smallCardTitle} text-center w-100 mt-2`}>
          <h4>{title}</h4>
        </div>
        <div className={`${styles.smallCardInfo} row`}>
          <div className="col-sm">
            <span className="mx-3">{prettifyDate()}</span>
            <span className="mx-3">{entryFee ? `$${entryFee}` : "No Fee"}</span>
            <span className="mx-3">{prettifyTime()}</span>
          </div>
        </div>
        <div className="row my-2">
          <div className="col-sm text-center my-auto">
            <img
              className={`${styles.cardImage} `}
              src={
                imgUrl ||
                "https://lh3.googleusercontent.com/OPYcKKKfd-8ygRSbb10ZvOQWbRTJqIuuwwkEyFIeyMQVpLzsOY9Zjdvc1WQWh3-zzLPaQfDGD8d64RJyzbhOTkS2g1xgRy7wC1yKs5ox7aE84LE6gpw_-SSxyWtf8E9fJmF_Zlw"
              }
              alt="promotional picture"
            />
          </div>

          <div className="col-sm">
            <div className="row">
              <div className="col-sm">
                <p className="text-left my-3 overflow-hidden">{details}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.largeCardInfo} row`}>
          <div className="col-sm">
            <span className="mx-3">{prettifyDate()}</span>
            <span className="mx-3">{entryFee ? `$${entryFee}` : "No Fee"}</span>
            <span className="mx-3">{prettifyTime()}</span>
          </div>
        </div>
      </div>
    </a>
  );
}
