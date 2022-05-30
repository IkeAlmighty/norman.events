// This page is a utility page for Links to point to.
// After logging out, it automatically redirects
// to the homepage.

import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect } from "react";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    async function logoutAndRedirect() {
      await fetch("/api/users/signout");
      router.push("/");
    }
    logoutAndRedirect();
  }, []);

  return (
    <div>
      Redirecting... Click{" "}
      <Link href="/">
        <b>
          <a>here</a>
        </b>
      </Link>{" "}
      if redirect fails.
    </div>
  );
}
