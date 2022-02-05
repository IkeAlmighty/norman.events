import { useState, useRef, useEffect } from "react";
import EventCard from "../components/EventCard";
import S3Upload from "../components/S3Upload";
import Script from "next/script";
import styles from "../styles/request.module.css";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

export default function RequestEvent({ session }) {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [entryFee, setEntryFee] = useState("");
  const [imgKey, setImgKey] = useState("");
  const [details, setDetails] = useState("");
  const [address, setAddress] = useState("");
  const [googleMapUrl, setGoogleMapUrl] = useState("");
  const [eventSlug, setEventSlug] = useState("");

  const [detailsCharCount, setDetailsCharCount] = useState(0);

  const [errorMessage, setErrorMessage] = useState(undefined);

  const router = useRouter();

  async function submitRequest(e) {
    e.preventDefault();
    //FIXME: the directions button does not work if it is place instead of an address
    // make the address always an address
    const eventData = {
      title,
      time: new Date(time).getTime(), // for faster querying in other parts of the app, time since epoch is stored
      entryFee: parseInt(entryFee),
      imgKey,
      details,
      address,
      googleMapUrl,
      eventSlug,
      _id: eventSlug,
    };

    const keys = Object.keys(eventData);
    for (let index = 0; index <= keys.length; index++) {
      if (eventData[keys[index]] === "" && keys[index] !== "details") {
        setErrorMessage("All fields except 'Details' must be filled out.");
        return;
      }
    }

    let res = await fetch("/api/events/create-request", {
      method: "POST",
      body: JSON.stringify({ eventData }),
    });

    // TODO: let the user know that the request has been sent

    if (session.isAdmin) {
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
              <label className="col-sm px-0 py-2 w-100">Entry Fee</label>

              <input
                className="col-sm"
                type="number"
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
              onClick={submitRequest}
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
  return { props: { session } };
}
