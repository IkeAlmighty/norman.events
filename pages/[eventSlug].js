import clientPromise from "../utils/mongodb";

export default function EventSlug({}) {
  return <div></div>;
}

export async function getServerSideProps({ query }) {
  const { eventSlug } = query;
  const client = await clientPromise;
  const eventData = await client
    .db()
    .collection("events")
    .findOne({ eventSlug }, { projection: { _id: 0 } });

  return { props: { ...eventData } };
}
