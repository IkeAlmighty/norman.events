import { useState, useRef, useEffect } from "react";
import EventCard from "../components/EventCard";
import S3Upload from "../components/S3Upload";
import Script from "next/script";
import styles from "../styles/request.module.css";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

export default function RequestEvent({ session, event }) {
  const [title, setTitle] = useState(event?.title || "");

  // TODO: once getNullOrDateTIme is working, use it to initialize
  const [time, setTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [showEndTime, setShowEndTime] = useState(false);
  const [entryFee, setEntryFee] = useState(event?.entryFee || "");
  const [imgKey, setImgKey] = useState(event?.imgKey || "");
  const [details, setDetails] = useState(event?.details || "");
  const [address, setAddress] = useState(event?.address || "");
  const [googleMapUrl, setGoogleMapUrl] = useState(event?.googleMapUrl || "");
  const [eventSlug, setEventSlug] = useState(event?.eventSlug || "");
  const [contactEmail, setContactEmail] = useState(event?.contactEmail || "");
  const [showContactEmail, setShowContactEmail] = useState(
    event?.showContactEmail || false
  );
  const [isPublicEvent, setIsPublicEvent] = useState(
    event?.isPublicEvent || true
  );

  const [detailsCharCount, setDetailsCharCount] = useState(0);

  const [errorMessage, setErrorMessage] = useState(undefined);

  const router = useRouter();

  // helper function for formatting the datetime input field with prefilled data:
  function getNullOrDateTime() {
    // this function is only used when there is prefilled data, so check to see if 'event.time' exists:
    if (!event || !event.time) return undefined;

    // FIXME: For some reason this creates an invalid date, fix it so that it creates a valid date
    const date = new Date(event.time);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const year = date.getFullYear();
    console.log("date:", date.toLocaleDateString());

    return `${year}-${month}-${day}`;
  }

  async function submitRequest(e) {
    e?.preventDefault();
    const eventData = {
      title,
      time: new Date(time).getTime(), // for faster querying in other parts of the app, time since epoch is stored
      endTime: showEndTime ? new Date(endTime).getTime() : undefined, // some kind value must be passed for form validation
      entryFee: parseInt(entryFee),
      imgKey,
      details,
      address,
      googleMapUrl,
      eventSlug,
      contactEmail,
      showContactEmail,
      isPublicEvent,
      _id: eventSlug,
    };

    // Edit the event if event data was provided when the page loaded:
    const eventDataExists = JSON.stringify(event) !== JSON.stringify({});
    const endpoint = eventDataExists
      ? "/api/events/edit-request"
      : "/api/events/create-request";

    // submit the request to the backend
    let res = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify({ eventData }),
    });

    // send server errors to error message and return if error happens:
    if ((await res.status) >= 400) {
      setErrorMessage(await res.text());
      return;
    }

    // TODO: let the user know that the request has been sent

    if (session?.user?.isAdmin) {
      router.push("/admin");
    } else {
      router.push("/");
    }
  }

  const addressInputBox = useRef();

  useEffect(() => {
    let searchBox = new google.maps.places.SearchBox(addressInputBox.current);

    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();
      if (places.length === 0) return;
      setAddress(places[0].formatted_address);
      setGoogleMapUrl(places[0].url);
    });
  }, []);

  return (
    <main className="px-auto">
      {/* FIXME: move this script to the index page so it is still loaded on router.push to this page */}
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_KEY}&libraries=places`}
        strategy="beforeInteractive"
      />
      <div style={{ maxWidth: "600px" }} className="mx-auto w-100 my-3">
        <h1 className="text-center my-5">Create an Event</h1>
        <form onSubmit={(e) => submitRequest(e)}>
          <div className="container">
            <div className="mx-1 mb-3 row">
              <label className="col-sm px-0 py-2 w-100">Title</label>

              <input
                required
                className="col-sm"
                type="text"
                maxLength="23"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="mx-1 mb-3 row">
              <label className="col-sm px-0 py-2 w-100">Time</label>

              <input
                required
                className="col-sm"
                type="datetime-local"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>

            <div className="mx-1 mb-3 row">
              <label className="col-sm px-0 py-2 w-100">
                <input
                  type="checkbox"
                  checked={showEndTime}
                  onChange={() => setShowEndTime(!showEndTime)}
                />
                <label className="mx-2 px-0 py-2">Include End Time</label>
              </label>

              {showEndTime && (
                <input
                  required
                  className="col-sm"
                  type="datetime-local"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              )}
            </div>

            <div className="mx-1 mb-3 row">
              <label className="col-sm px-0 py-2 w-100">Entry Fee</label>

              <input
                className="col-sm"
                type="number"
                step=".01"
                value={entryFee}
                onChange={(e) => setEntryFee(e.target.value)}
              />
            </div>

            <div className="mx-1 mb-3 row">
              <label className="col-sm px-0 py-2 w-100">
                Details ({detailsCharCount}/1000) - Markdown Supported
              </label>

              <div className="col-sm px-0 m-0">
                <textarea
                  maxLength="1000"
                  className="w-100 px-3 py-2"
                  style={{ height: "150px" }}
                  value={details}
                  onChange={(e) => {
                    setDetails(e.target.value);
                    setDetailsCharCount(e.target.value.length);
                  }}
                />
              </div>
            </div>

            <div className="mx-1 mb-3 row">
              <label className="col-sm px-0 py-2 w-100">Address</label>
              <input
                className="col-sm"
                ref={addressInputBox}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="mx-1 mb-3 row">
              <label className="col-sm px-0 py-2 w-100">Url Slug</label>

              <input
                className={`col-sm text-secondary`}
                type="text"
                value={"norman.events/" + (eventSlug ? eventSlug : "")}
                onChange={(e) => setEventSlug(e.target.value.split("/")[1])}
              />
            </div>

            <div className="mx-1 mb-3 row">
              <label className="col-sm px-0 py-2 w-100">Contact Email</label>

              <input
                className="col-sm"
                type="email"
                onChange={(e) => setContactEmail(e.target.value)}
              />
            </div>

            <div className="mx-1 mb-3">
              <input
                type="checkbox"
                checked={showContactEmail}
                onChange={() => setShowContactEmail(!showContactEmail)}
              />
              <label className="mx-2 px-0 py-2">
                Publicly show contact email
              </label>
            </div>

            <div className="mx-1 mb-3">
              <input
                type="checkbox"
                checked={isPublicEvent}
                onChange={() => setIsPublicEvent(!isPublicEvent)}
              />
              <label className="mx-2 px-0 py-2">Show event on homepage</label>
            </div>

            {/* image upload button */}
            <div className="mx-1 mb-3 row">
              <S3Upload
                label="Upload Image"
                onUpload={async (filename) => setImgKey(filename)}
                className="mx-0"
              />
            </div>
          </div>

          <h2 className="mt-5 text-center">Preview</h2>
          <EventCard
            title={title}
            time={time}
            endTime={endTime}
            entryFee={entryFee}
            imgKey={imgKey}
            details={details}
            googleMapUrl={googleMapUrl}
            eventSlug="/" // this is just a preview, so no need to make the onClick functional
          />
          <div className="text-center">
            <input
              className="btn btn-primary mt-3"
              type="submit"
              value="Submit Request"
            />
          </div>
        </form>
      </div>

      {errorMessage && (
        <div className={styles.errorDiv}>
          <div className={styles.errorContent}>
            <div className="my-3 text-center">{errorMessage}</div>
            <div className="my-3 text-center">
              <button onClick={() => setErrorMessage(undefined)}> Okay </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const event = context.query;

  return { props: { session, event } };
}
