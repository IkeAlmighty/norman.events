import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect, useState, useRef } from "react";
import styles from "./EventCreator.module.css";
import S3Upload from "./S3Upload";

export default function EventCreator({ session }) {
  const router = useRouter();
  if (!session) {
    router.push("/login");
    return <></>;
  }

  // document fields:
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("none");
  const [repeatOption, setRepeatOption] = useState("never");
  const [entryFee, setEntryFee] = useState(0);
  const [imageKey, setImageKey] = useState();
  const [description, setDescription] = useState();
  const [address, setAddress] = useState();
  const [showOnHomepage, setShowOnHomepage] = useState();
  const [scoutPayment, setScoutPayment] = useState();

  // full document object:
  const [eventDocument, setEventDocument] = useState({});

  // ui related properties:
  const [showEndTime, setShowEndTime] = useState();
  const [showRepeatOptions, setShowRepeatOptions] = useState();

  // google places api address input field element reference:
  const addressInputField = useRef();

  // functions
  async function submitRequest() {}

  function onPlacesChanged() {}

  // useEffect functions:
  function initializeGoogleAddressSearch() {}

  function updateEventDocument() {
    setEventDocument({
      startTime,
      endTime,
      repeatOption,
      entryFee,
      imageKey,
      description,
      address,
      showOnHomepage,
      scoutPayment,
    });
  }

  function initGooglePlacesApi() {
    let searchBox = new google.maps.places.SearchBox(addressInputField.current);

    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();
      if (places.length === 0) return;
      setAddress(places[0].formatted_address);
      setGoogleMapUrl(places[0].url);
    });
  }

  // register useEffect functions:
  useEffect(initializeGoogleAddressSearch, []);
  useEffect(updateEventDocument, [
    startTime,
    endTime,
    repeatOption,
    entryFee,
    imageKey,
    description,
    address,
    showOnHomepage,
    scoutPayment,
  ]);

  useEffect(initGooglePlacesApi, []);

  // for dev:
  if (process.env.NODE_ENV === "development") {
    useEffect(() => console.log("event doc: ", eventDocument), [eventDocument]);
  }

  // render
  return (
    <div>
      {/* Load Google Places JS API: */}
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_KEY}&libraries=places`}
        strategy="beforeInteractive"
      />

      <div className="my-3">
        Welcome to your dashboard, {session.user.username}
      </div>

      <h1>Create an Event</h1>

      {/* event "form" */}
      <div style={{ maxWidth: 480 }}>
        {/* scout payment */}
        <div className={styles.inputContainer}>
          <div>Select your payment for posting this event:</div>
          <select onChange={(e) => setScoutPayment(e.target.value)}>
            <option>$ 2.00</option>
            <option>Photoshoot</option>
            <option>Pasta Sauce (must live near norman)</option>
            <option>Free norman.events Event Boost</option>
          </select>
        </div>

        <hr />

        {/* Title */}
        <div className={styles.inputContainer}>
          <label>
            <div>Title</div>
            <div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </label>
        </div>
        {/* start time */}
        <div className={styles.inputContainer}>
          <label>
            <div>Start Time</div>
            <div>
              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
          </label>
        </div>

        {/* show end time */}
        <div>
          <label>
            <input
              type="checkbox"
              value={showEndTime}
              onChange={() => {
                if (showEndTime) setEndTime("none");
                setShowEndTime(!showEndTime);
              }}
            />
            <span className="mx-3">Show End Time</span>
          </label>
        </div>

        {/* end time */}
        {showEndTime && (
          <div className={styles.inputContainer}>
            <label>
              <div>End Time:</div>
              <div>
                <input
                  type="datetime-local"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </label>
          </div>
        )}

        {/* checkbox for showRepeatOptions */}
        <div className={styles.inputContainer}>
          <label>
            <input
              type="checkbox"
              onChange={() => {
                if (showRepeatOptions === true) setRepeatOption("never");
                else setRepeatOption("weekly");
                setShowRepeatOptions(!showRepeatOptions);
              }}
              checked={showRepeatOptions === true}
              className="d-inline w-auto"
            />
            <span className="mx-3">Repeat this Event</span>
          </label>

          {/* repeat options */}
          {showRepeatOptions && (
            <div>
              <label>
                <input
                  className="w-auto"
                  type="radio"
                  name="repeatOption"
                  value="daily"
                  onChange={(e) => setRepeatOption(e.target.value)}
                />
                <span className="mx-2">Daily</span>
              </label>
              <label>
                <input
                  className="w-auto"
                  type="radio"
                  name="repeatOption"
                  defaultChecked={true}
                  value="weekly"
                  onChange={(e) => setRepeatOption(e.target.value)}
                />
                <span className="mx-2">Weekly</span>
              </label>
              <label>
                <input
                  className="w-auto"
                  type="radio"
                  name="repeatOption"
                  value="monthly"
                  onChange={(e) => setRepeatOption(e.target.value)}
                />
                <span className="mx-2">Monthly</span>
              </label>
            </div>
          )}
        </div>

        {/* entry fee */}
        <div className={styles.inputContainer}>
          <label>
            <div>Entry Fee in $</div>
            <div>
              {/* TODO: this needs to be more managed so that users can only enter correct numbers */}
              <input
                type="number"
                value={entryFee}
                onChange={(e) => setEntryFee(parseFloat(e.target.value) || 0)}
              />
            </div>
          </label>
        </div>

        {/* Upload Image */}
        <div className={styles.inputContainer}>
          <S3Upload
            label="Choose Image"
            onUpload={(newImageKey) => setImageKey(newImageKey)}
          />
        </div>

        {/* description */}
        <div className={styles.inputContainer}>
          <div>Description &#40;200 characters&#41;</div>
          <textarea style={{ height: "200px" }} maxLength={200} />
        </div>

        {/* address */}
        <div className={styles.inputContainer}>
          <label>
            <div>Address</div>
            <div>
              <input
                ref={addressInputField}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </label>
        </div>

        {/* show on homepage */}
        <div className={styles.inputContainer}>
          <label>
            <input
              className="w-auto"
              type="checkbox"
              value={showOnHomepage}
              onChange={() => setShowOnHomepage(!showOnHomepage)}
            />
            <span className="mx-2"> Show Event on Public Feed</span>
          </label>
        </div>
      </div>
    </div>
  );
}
