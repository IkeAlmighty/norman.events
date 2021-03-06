import { getFutureEventsSorted } from "../utils/mongoqueries";

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
            <div className="row">
              <div className="text-center d-inline-block col-9 h-100">
                <img src="/banner.jpeg" className={styles.bannerImg} />
              </div>
              {/* <div className="col-3" /> */}
            </div>
            <SlideMenu>
              <a href="/request" className="menu-item">
                &gt; Request an Event
              </a>
            </SlideMenu>
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
  return { props: { events: await getFutureEventsSorted() } };
}
