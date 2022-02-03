import clientPromise from "../../../utils/mongodb";

export default async (req, res) => {
  const { _id } = JSON.parse(req.body);

  const client = await clientPromise;

  const mongores = await client.db().collection("events").deleteOne({ _id });

  if (mongores.deletedCount === 1) {
    res.status(204).end();
  } else {
    res.status(400).end();
  }
};
