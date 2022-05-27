import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function submitLogin(e) {
    e.preventDefault();

    let res = await fetch("/api/users/authenticate", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    console.log(await res.text());
  }

  return (
    <div className="mx-auto w-75 my-3">
      <form onSubmit={(e) => submitLogin(e)}>
        <input
          className="d-block my-3"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          placeholder="username"
        />
        <input
          className="d-block my-3"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="password"
        />
        <input className="d-block my-3" type="submit" value="Login" />
      </form>
    </div>
  );
}
