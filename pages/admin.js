import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import EventCard from "../components/EventCard";
import clientPromise from "../utils/mongodb";
import styles from "../styles/admin.module.css";

export default function Admin({ session }) {
  const [events, setEvents] = useState();
  const [toggleApproved, setToggleApproved] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if ((session && !session.user.isAdmin) || !session) {
      router.push("/api/auth/signin");
    }
  }, []);

  useEffect(async () => {
    //FIXME: make this so that after the first time only ui changes are made, no fetches
    if (toggleApproved) {
      const res = await fetch("/api/events/get-events");
      setEvents(await res.json());
    } else {
      const res = await fetch("/api/events/get-requests");
      setEvents(await res.json());
    }
  }, [toggleApproved]);

  if ((session && !session.user.isAdmin) || !session) {
    return <>redirecting to login</>;
  }

  async function approveDraft(_id) {
    // update ui:
    setEvents(events.filter((val) => val._id !== _id));

    // send request to add the draft to the events collection:
    let res = await fetch("/api/events/approve-request", {
      method: "POST",
      body: JSON.stringify({ _id }),
    });

    if (!res.status === 200) {
      alert("server error: draft not approved");
    }
  }

  async function declineDraft(_id) {
    // update ui:
    setEvents(events.filter((val) => val._id !== _id));

    // send request to remove the draft from the database:
    let res = await fetch("api/events/decline-request", {
      method: "DELETE",
      body: JSON.stringify({ _id }),
    });
  }

  async function deleteEvent(_id) {
    // update ui:
    setEvents(events.filter((val) => val._id !== _id));

    // send request to remove event from database:
    let res = await fetch("api/events/delete-event", {
      method: "DELETE",
      body: JSON.stringify({ _id }),
    });
  }

  return (
    <>
      <h1 className="p-3">Hi {session.user.name.split(" ")[0]} :)</h1>

      <button
        className="mx-3"
        onClick={() => setToggleApproved(!toggleApproved)}
      >
        {toggleApproved ? "Manage Requests" : "Manage Live Events"}
      </button>
      {!toggleApproved && (
        <span className="px-3">
          There are {events?.length} event requests to approve.
        </span>
      )}
      {events?.map((draft) => {
        return (
          <div key={draft._id} className="border py-3">
            <EventCard
              title={draft.title}
              time={draft.time}
              entryFee={draft.entryFee}
              imgKey={draft.imgKey}
              details={draft.details}
              googleMapUrl={draft.googleMapUrl}
              eventSlug={draft.eventSlug}
            />
            <div className="max-w-600px mx-auto text-center">
              {!toggleApproved && (
                <div>
                  <button
                    className={`${styles.btn} ${styles.btnApprove}`}
                    onClick={() => approveDraft(draft._id)}
                  >
                    Approve
                  </button>
                  <button className={`${styles.btn}`}>Edit</button>
                  <button
                    className={`${styles.btn} ${styles.btnDeny}`}
                    onClick={() => declineDraft(draft._id)}
                  >
                    Deny
                  </button>
                </div>
              )}

              {toggleApproved && (
                <div>
                  <button className={styles.btn}>Edit</button>
                  <button
                    className={styles.btn}
                    onClick={() => deleteEvent(draft._id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}

export async function getServerSideProps(context) {
  const client = await clientPromise;

  return { props: { session: await getSession(context) } };
}
