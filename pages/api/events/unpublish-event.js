import clientPromise from "../../../utils/mongodb";

export default async (req, res) => {
  const { _id } = JSON.parse(req.body);
  const client = await clientPromise;

  const event = await client.db().collection("events").findOne({ _id });
  const deleteRes = await client.db().collection("events").deleteOne({ _id });

  let draftAddRes = await client
    .db()
    .collection("event-requests")
    .insertOne({ ...event });

  // TODO: proper error codes:

  res.status(204).end();
};
