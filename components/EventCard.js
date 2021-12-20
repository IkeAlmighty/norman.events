export default function EventCard({
  title,
  time,
  entryFee,
  imgUrl,
  details,
  googleMapUrl,
  eventSlug,
}) {
  return (
    <a href={`/${eventSlug}`}>
      <div
        className="mx-auto my-3 py-1 text-center bg-light"
        style={{ height: "175px", width: "100%", maxWidth: "600px" }}
      >
        <div className="d-inline-block w-50 float-left">
          <img width="50%" src={imgUrl} alt="promotional picture" />
        </div>
        <div className="d-inline-block w-50 float-right">
          <h3>{title}</h3>
          <p>{details}</p>
        </div>
      </div>
    </a>
  );
}
