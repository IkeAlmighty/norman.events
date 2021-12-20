import Head from "next/head";
import EventCard from "../components/EventCard";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>norman.events</title>
        <meta name="description" content="Events in Norman, Oklahoma" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="px-auto">
        <div className="w-50 mx-auto">
          <EventCard
            title="Test Event"
            entryFee={5.25}
            imgUrl="https://discovery.sndimg.com/content/dam/images/discovery/fullset/2021/4/30/GettyImages-1189192456.jpg.rend.hgtvcom.406.406.suffix/1619849704543.jpeg"
            details="This is a test event"
            eventSlug="testSlug"
          />
        </div>
      </main>

      <footer></footer>
    </div>
  );
}
