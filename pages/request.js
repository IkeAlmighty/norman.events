import { useState, useRef, useEffect } from "react";
import EventCard from "../components/EventCard";
import S3Upload from "../components/S3Upload";
import { fetchImageUrl } from "../utils/s3";
import Script from "next/script";
import styles from "../styles/request.module.css";

export default function RequestEvent() {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [entryFee, setEntryFee] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [details, setDetails] = useState("");
  const [address, setAddress] = useState("");
  const [googleMapLink, setGoogleMapLink] = useState("");
  const [eventSlug, setEventSlug] = useState("");

  const [detailsCharCount, setDetailsCharCount] = useState(0);

  function submitRequest() {}

  async function updateImage(filename) {
    let res = await fetchImageUrl(filename);
    setImgUrl(res.url);
  }

  const addressInputBox = useRef();

  useEffect(() => {
    let searchBox = new google.maps.places.SearchBox(addressInputBox.current);

    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();
      if (places.length === 0) return;
      setAddress(places[0].formatted_address);
      setGoogleMapLink(places[0].url);
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
        <form onSubmit={submitRequest}>
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
                Details ({detailsCharCount}/175)
              </label>

              <div className="col-sm px-0 m-0">
                <textarea
                  maxLength="175"
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
                className="col-sm"
                type="text"
                value={eventSlug}
                onChange={(e) => setEventSlug(e.target.value)}
              />
            </div>

            <div className="mx-1 mb-3 row">
              <S3Upload
                label="Upload Image"
                onUpload={async (filename) => updateImage(filename)}
                className="mx-0"
              />
            </div>
          </div>
        </form>

        <h2 className="mt-5 text-center">Preview</h2>
        <EventCard
          title={title}
          time={time}
          entryFee={entryFee}
          imgUrl={imgUrl}
          details={details}
          googleMapUrl={googleMapLink}
          eventSlug="/" // this is just a preview, so no need to make the onClick functional
        />
      </div>
    </main>
  );
}
