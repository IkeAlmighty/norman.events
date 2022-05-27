// deletes the auth-token cookie, therefore signing out current user.

export default function hander(req, res) {
  res.setHeader("Set-Cookie", "auth-token=deleted; path=/;");
  res.end();
}
