import jwt from "jsonwebtoken";
import cookie from "cookie";

export function getSession(context) {
  // backend function that takes a request context and
  // decrypts a jwt in from the header, returning
  // the jwt data as json if it exists.
  // returns null if there is no JWT token in the header

  // First, abort if this is ran from the frontend:
  if (typeof window === "undefined") {
    // get the jwt bearer token from the request, if it exists:
    // console.log(context.req.headers);
    const token = cookie.parse(context.req.headers.cookie)["auth-token"];
    if (!token) return null;

    try {
      const tokenJSON = jwt.verify(token, process.env.JWT_SECRET);
      if (tokenJSON.exp && parseInt(tokenJSON.exp) > Date.now()) {
        return tokenJSON;
      } else return { tokenExpiredError: "token expired" };
    } catch (err) {
      return null;
    }
  } else {
    // throw error if this function is called on the client side:
    throw Error(
      "For security reasons, getSession should only be called on the server side."
    );
  }
}
