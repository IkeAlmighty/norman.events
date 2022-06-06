import clientPromise from "../../../utils/mongodb";

export default async (req, res) => {
  const { event } = JSON.parse(req.body);

  const client = await clientPromise;

  let mongoRes = await client
    .db()
    .collection("event-requests")
    .updateOne({ _id: event._id }, { $set: { ...event } }, { $upsert: true });

  res.status(200).send(mongoRes._id);
};
