import crypto from "crypto";

if (!process.env.JWT_SECRET) {
  throw new Error(
    "Please define JWT_SECRET in env variables. SHA256 uses JWT_SECRET for simplicity"
  );
}

// sha256 hash for passwords uses the same secret as the jwt signing for simplicity
const sha256 = (data) =>
  crypto
    .createHash("sha256")
    .update(data + process.env.JWT_SECRET)
    .digest("hex");

export default sha256;
