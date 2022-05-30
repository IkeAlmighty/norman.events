import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function submitLogin(e) {
    e.preventDefault();

    let res = await fetch("/api/users/authenticate", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    if (res.status === 200) {
      const userId = await res.text();
      router.push(`/users/${userId}`);
    } else {
      // TODO: display error message for to person logging in.
    }
  }

  return (
    <div className="mx-auto container my-3" style={{ maxWidth: "300px" }}>
      <div className="text-center h2">Login</div>
      <form onSubmit={(e) => submitLogin(e)}>
        <input
          className="d-block my-3 px-2 py-1 mx-auto w-100"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          placeholder="username"
        />
        <input
          className="d-block my-3 px-2 py-1 mx-auto w-100"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="password"
        />
        <input className="d-block my-3 mx-auto" type="submit" value="Login" />
      </form>

      <div className="text-center">
        <div className="my-3">OR</div>
        <div>
          <Link href="/create-user">
            <a className="border p-3">Create Account</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
