import clientPromise from "../utils/mongodb";

import Head from "next/head";
import SlideMenu from "../components/SlideMenu";
import EventCard from "../components/EventCard";
import styles from "../styles/index.module.css";

export default function Index({ events }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>norman.events</title>
        <meta name="description" content="Events in Norman, Oklahoma" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="px-auto">
        <div className={styles.navContainer}>
          <nav className="container max-w-600px">
            <ul className="list-unstyled row">
              <li className="text-center d-inline-block col-9 h-100">
                <img src="/banner.jpeg" className={styles.bannerImg} />
              </li>
              {/* <div className="col-3" /> */}
              <li className="d-inline-block col-3">
                <SlideMenu>
                  <a href="/request" className="menu-item">
                    &gt; Request an Event
                  </a>
                </SlideMenu>
              </li>
            </ul>
          </nav>
        </div>
        <div className="max-w-600px mx-auto">
          {events?.map((event) => (
            <EventCard
              key={event.eventSlug}
              title={event.title}
              time={event.time}
              endTime={event.endTime}
              entryFee={event.entryFee}
              imgKey={event.imgKey}
              details={event.details}
              googleMapUrl={event.googleMapUrl}
              eventSlug={event.eventSlug}
            />
          ))}
        </div>
      </main>

      <footer></footer>
    </div>
  );
}

export async function getServerSideProps(context) {
  const client = await clientPromise;

  const events = await client
    .db()
    .collection("events")
    .find({ time: { $gt: Date.now() }, isPublicEvent: true })
    .toArray();

  const sorted = events.sort(
    (previousEvent, nextEvent) => previousEvent.time - nextEvent.time
  );

  return { props: { events: sorted } };
}
