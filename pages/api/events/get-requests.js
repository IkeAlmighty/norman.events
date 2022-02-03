import clientPromise from "../../../utils/mongodb";

export default async (req, res) => {
  const client = await clientPromise;

  let requests = await client
    .db()
    .collection("event-requests")
    .find({})
    .toArray();

  res.json(requests);
};
