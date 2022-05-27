// create a new user, passing the given password
// through sha256 hash before storage for security

import clientPromise from "../../../utils/mongodb";
import sha256 from "../../../utils/sha256";

export default async function hander(req, res) {
  if (req.method !== "POST") {
    res.status(400).send("/api/users/create only takes POST requests.");
    return;
  }

  console.log("creating a user...");

  const { username, password, email } = JSON.parse(req.body);
  console.log(username, password, email);

  if (!username) {
    res
      .status(400)
      .send("username is must be defined in POST body for /api/users/create");
    return;
  }
  if (!password) {
    res
      .status(400)
      .send("password is must be defined in POST body for /api/users/create");
    return;
  }
  if (!email) {
    res
      .status(400)
      .send("email is must be defined in POST body for /api/users/create");
    return;
  }

  console.log("looking up user in db...");

  const client = await clientPromise;
  const user = await client
    .db()
    .collection("users")
    .findOne({ username, password: sha256(password), email });

  if (!user) {
    console.log("creating ", username);
    // TODO: implement proper mongodb error handling
    const mongoInsertResponse = await client
      .db()
      .collection("users")
      .insertOne({ username, password: sha256(password), email });

    res.status(200).end();
    return;
  } else {
    res.status(400).send("User already exists");
    return;
  }
}
