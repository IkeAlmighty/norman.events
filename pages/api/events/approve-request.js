import clientPromise from "../../../utils/mongodb";

export default async (req, res) => {
  const client = await clientPromise;

  const { _id } = JSON.parse(req.body);

  // find the event in event-drafts collection:
  const event = await client.db().collection("event-requests").findOne({ _id });

  // insert the found event into the events collections:
  const mongoRes = await client.db().collection("events").insertOne(event);

  // if insertion is successful, then remove it from the requests collection:
  if (!mongoRes.error) {
    await client.db().collection("event-requests").deleteOne({ _id });
  }

  //TODO: give proper error codes
  res.status(200).end();
};
