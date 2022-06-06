import Navigation from "../../components/Navigation";
import { getSession } from "../../utils/auth";
import clientPromise from "../../utils/mongodb";
import EventCard from "../../components/EventCard";
import EventCreator from "../../components/EventCreator";

export default function User({ events, session }) {
  return (
    <div>
      <Navigation session={session} />
      <div className="mx-3">
        <EventCreator session={session} />
        {events.map((event) => {
          return <EventCard key={event._id} eventData={event} />;
        })}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  // get logged in user, or redirect if nobody is logged in:
  const session = getSession(context);
  if (!session) return { redirect: { destination: "/login" } };

  // grab all events created by this user, filtering out old events:
  const client = await clientPromise;
  const events = await client
    .db()
    .collection("events")
    .aggregate([
      { $match: { userId: session.user._id } }, // filter out events not made by the logged in user
      { $addFields: { timeGTNow: { $gt: ["$time", Date.now()] } } }, // create a bool field determining whether event is in the future
      { $match: { timeGTNow: true } }, // match events in the future
      { $project: { timeGTNow: 0 } }, // remove the previously created bool field
      { $sort: { time: -1 } }, // sort by when the event is happening
      { $addFields: { _id: { $toString: "$_id" } } }, // convert the _id field to a string
    ])
    .toArray();

  return { props: { session, events } };
}
