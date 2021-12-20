import { useState } from "react";
import EventCard from "../components/EventCard";

export default function RequestEvent() {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [entryFee, setEntryFee] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [details, setDetails] = useState("");
  const [address, setAddress] = useState("");
  const [eventSlug, setEventSlug] = useState("");

  function submitRequest() {}

  function getGoogleMapUrl() {}

  return (
    <main className="px-auto">
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
              <label className="col-sm px-0 py-2 w-100">Details</label>

              <div className="col-sm px-0 m-0">
                <textarea
                  className="w-100 px-3 py-2"
                  style={{ height: "150px" }}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                />
              </div>
            </div>

            <div className="mx-1 mb-3 row">
              <label className="col-sm px-0 py-2 w-100">Address</label>

              <input
                className="col-sm"
                type="text"
                value={address}
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
          </div>
        </form>

        <h2 className="mt-5 text-center">Preview</h2>
        <EventCard
          title={title}
          time={time}
          entryFee={entryFee}
          imgUrl={imgUrl}
          details={details}
          googleMapUrl={getGoogleMapUrl()}
          eventSlug="/" // this is just a preview, so no need to make the onClick functional
        />
      </div>
    </main>
  );
}
