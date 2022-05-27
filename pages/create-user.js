import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  async function submitCreateUser(e) {
    e.preventDefault();

    if (passwordCheck !== password) {
      alert("passwords do not match");
      return;
    }

    let res = await fetch("/api/users/create", {
      method: "POST",
      body: JSON.stringify({ username, password, email }),
    });

    if (res.status !== 200) {
      alert(await res.text());
    }

    console.log(res);
  }

  return (
    <div className="mx-auto w-75 my-3">
      <form onSubmit={(e) => submitCreateUser(e)}>
        <input
          className="d-block my-3"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          placeholder="username"
        />
        <input
          className="d-block my-3"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="email"
        />
        <input
          className="d-block my-3"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="password"
        />
        <input
          className="d-block my-3"
          type="password"
          onChange={(e) => setPasswordCheck(e.target.value)}
          value={passwordCheck}
          placeholder="retype password"
        />
        <input className="d-block my-3" type="submit" value="Create User" />
      </form>
    </div>
  );
}
