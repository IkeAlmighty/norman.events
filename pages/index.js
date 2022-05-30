import { getFutureEventsSorted } from "../utils/mongoqueries";
import { getSession } from "../utils/auth";

import Head from "next/head";
import Navigation from "../components/Navigation";
import EventCard from "../components/EventCard";

export default function Index({ events, session }) {
  return (
    <div>
      <Head>
        <title>norman.events</title>
        <meta name="description" content="Events in Norman, Oklahoma" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="px-auto">
        <Navigation session={session} />
        <div className="max-w-600px mx-auto">
          {events?.map((event) => (
            <EventCard key={event.eventSlug} eventData={event} />
          ))}
        </div>
      </main>

      <footer></footer>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = getSession(context);
  return { props: { events: await getFutureEventsSorted(), session } };
}
