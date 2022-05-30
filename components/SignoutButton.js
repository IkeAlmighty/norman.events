import { useRouter } from "next/router";

export default function SignoutButton({ className }) {
  const router = useRouter();
  async function signout() {
    // send a request to delete the session cookie:
    let apiSignoutResponse = await fetch("/api/users/signout");

    // redirect to homepage
    router.push("/");
  }

  return (
    <button className={className} onClick={() => signout()}>
      Sign Out
    </button>
  );
}
