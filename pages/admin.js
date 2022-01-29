import { useRouter } from "next/router";
import { useEffect } from "react";
import { getSession } from "next-auth/react";
import EventCard from "../components/EventCard";
import clientPromise from "../utils/mongodb";

export default function Admin({ drafts, session }) {
  const router = useRouter();

  useEffect(() => {
    if (!session.user.isAdmin) router.push("/api/auth/signin");
  }, []);

  if (!session.user.isAdmin) {
    return <>redirecting to login</>;
  }

  return (
    <>
      <h1 className="p-3">Hi {session.user.name.split(" ")[0]} :)</h1>
      <span className="px-3">
        There are {drafts.length} event requests to approve.
      </span>
      {drafts.map((draft) => {
        return (
          <div key={draft._id} className="border py-3">
            <EventCard
              title={draft.title}
              time={draft.time}
              entryFee={draft.entryFee}
              imgUrl={draft.imgUrl}
              details={draft.details}
              googleMapUrl={draft.googleMapUrl}
              eventSlug={draft.eventSlug}
            />
            <div className="max-w-600px mx-auto text-center">
              <button
                className="rounded px-3 bg-success text-white"
                onClick={() => approveDraft(draft._id)}
              >
                Approve
              </button>
              <button
                className="rounded px-3 bg-danger text-white"
                onClick={() => approveDraft(draft._id)}
              >
                Deny
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}

export async function getServerSideProps(context) {
  const client = await clientPromise;
  const drafts = await client
    .db()
    .collection("event-requests")
    .find({})
    .toArray();

  return { props: { drafts, session: await getSession(context) } };
}
