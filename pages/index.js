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
        <div className={styles.navContainer}>
          <nav className="container max-w-600px">
            <ul className="list-unstyled row">
              <li className="text-center d-inline-block border border-dark rounded p-2 bg-light col">
                <a href="/request">Request and Event</a>
              </li>
              <li className="text-center d-inline-block p-2 col">
                Norman Events
              </li>
            </ul>
          </nav>
        </div>
        <div className="max-w-600px mx-auto">
          <EventCard
            title="Test Event"
            entryFee={5.25}
            imgUrl="https://discovery.sndimg.com/content/dam/images/discovery/fullset/2021/4/30/GettyImages-1189192456.jpg.rend.hgtvcom.406.406.suffix/1619849704543.jpeg"
            details="This is a test event"
            eventSlug="testSlug"
            googleMapUrl={
              "https://www.google.com/maps?q=norman+ok&um=1&ie=UTF-8&sa=X&ved=2ahUKEwjByPeOs6j1AhXWk2oFHTxGBKcQ_AUoAXoECAIQAw"
            }
          />

          <EventCard
            title="Test Event"
            entryFee={5.25}
            imgUrl="https://discovery.sndimg.com/content/dam/images/discovery/fullset/2021/4/30/GettyImages-1189192456.jpg.rend.hgtvcom.406.406.suffix/1619849704543.jpeg"
            details="This is a test event"
            eventSlug="testSlug"
            googleMapUrl={
              "https://www.google.com/maps?q=norman+ok&um=1&ie=UTF-8&sa=X&ved=2ahUKEwjByPeOs6j1AhXWk2oFHTxGBKcQ_AUoAXoECAIQAw"
            }
          />

          <EventCard
            title="Test Event"
            entryFee={5.25}
            imgUrl="https://discovery.sndimg.com/content/dam/images/discovery/fullset/2021/4/30/GettyImages-1189192456.jpg.rend.hgtvcom.406.406.suffix/1619849704543.jpeg"
            details="This is a test event"
            eventSlug="testSlug"
            googleMapUrl={
              "https://www.google.com/maps?q=norman+ok&um=1&ie=UTF-8&sa=X&ved=2ahUKEwjByPeOs6j1AhXWk2oFHTxGBKcQ_AUoAXoECAIQAw"
            }
          />
        </div>
      </main>

      <footer></footer>
    </div>
  );
}
