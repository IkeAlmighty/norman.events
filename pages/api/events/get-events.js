import clientPromise from "../../../utils/mongodb";

export default async (req, res) => {
  const client = await clientPromise;

  const events = await client.db().collection("events").find({}).toArray();

  res.json(events);
};
