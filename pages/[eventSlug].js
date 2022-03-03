import S3Image from "../components/S3Image";
import clientPromise from "../utils/mongodb";
import { marked } from "marked";
import { prettifyTime, prettifyDate } from "../utils/datetime";
import styles from "../styles/eventSlug.module.css";

export default function EventSlug({
  googleMapUrl,
  title,
  imgKey,
  details,
  entryFee,
  time,
  contactEmail,
  showContactEmail,
}) {
  function createMarkup() {
    return { __html: marked(details || "") };
  }

  return (
    <div className="max-w-600px mx-auto my-3 px-3">
      <h1 className="text-center">{title}</h1>
      <div className={styles.imgContainer}>
        <S3Image imageKey={imgKey} className={styles.img} />
      </div>
      <div className="my-3" dangerouslySetInnerHTML={createMarkup()} />
      <div>
        {entryFee > 0
          ? `Entry Fee: $${parseFloat(entryFee).toFixed(2)}`
          : "No Entry Fee"}
      </div>
      <div>Time: {prettifyTime(time)}</div>
      <div>Date: {prettifyDate(time)}</div>
      <div>
        <u>
          <a href={googleMapUrl}>Directions</a>
        </u>
      </div>
      {contactEmail && showContactEmail && (
        <div className="my-3">
          Contact <a href={`mailto:${contactEmail}`}>{contactEmail}</a> with
          questions regarding the event.
        </div>
      )}

      <div className="my-3">
        <u>
          <a href="/">&lt; VIEW ALL EVENTS</a>
        </u>
      </div>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const { eventSlug } = query;
  const client = await clientPromise;
  const eventData = await client
    .db()
    .collection("events")
    .findOne({ eventSlug });

  return { props: { ...eventData } };
}
