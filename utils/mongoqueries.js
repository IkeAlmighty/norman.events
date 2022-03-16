import clientPromise from "./mongodb";

export async function getFutureEventsSorted() {
  const client = await clientPromise;

  // get all upcoming, public, nonrepeating events:
  const events = await client
    .db()
    .collection("events")
    .find({
      time: { $gt: Date.now() },
      isPublicEvent: true,
      repeatOption: { $eq: "never" },
    })
    .toArray();

  // get all public repeating events
  // (regardless of time)
  const repeatingEvents = await client
    .db()
    .collection("events")
    .find({
      isPublicEvent: true,
      repeatOption: { $ne: "never" },
    })
    .toArray();

  // for each repeating event, duplicate and add
  // correct dates for their repeats:

  const withReoccuring = [];

  for (const event of repeatingEvents) {
    withReoccuring.push(event);

    if (event.repeatOption) {
      for (let i = 1; i <= 10; i++) {
        if (event.repeatOption === "weekly") {
          const duplicate = { ...event };

          // correct the start datetime
          duplicate.time = new Date(
            duplicate.time + i * 7 * 24 * 60 * 60 * 1000
          ).getTime();

          if (duplicate.endTime) {
            // correct the end datetime
            duplicate.endTime = new Date(
              duplicate.endTime + i * 7 * 24 * 60 * 60 * 1000
            ).getTime();
          }
          withReoccuring.push(duplicate);
        }
        if (event.repeatOption === "everytwoweeks") {
          const duplicate = { ...event };

          // correct the start datetime
          duplicate.time = new Date(
            duplicate.time + i * 2 * 7 * 24 * 60 * 60 * 1000
          ).getTime();

          if (duplicate.endTime) {
            // correct the end datetime
            duplicate.endTime = new Date(
              duplicate.endTime + i * 2 * 7 * 24 * 60 * 60 * 1000
            ).getTime();
          }
          withReoccuring.push(duplicate);
        }
        if (event.repeatOption === "monthly") {
          const duplicate = { ...event };

          // correct the start datetime
          const startDateTime = new Date(duplicate.time);
          startDateTime.setMonth(startDateTime.getMonth() + i);
          duplicate.time = startDateTime.getTime();

          if (duplicate.endTime) {
            // correct the end datetime
            const endDateTime = new Date(duplicate.endTime);
            endDateTime.setMonth(endDateTime.getMonth() + i);
            duplicate.endTime = endDateTime.getTime();
          }
          withReoccuring.push(duplicate);
        }
      }
    }
  }

  // filter out repeat events that happened in the past:
  withReoccuring.filter((element) => {
    if (element.endTime) return element.endTime > Date.now();
    else return element.time > Date.now();
  });

  const sorted = events
    .concat(withReoccuring)
    .sort((previousEvent, nextEvent) => previousEvent.time - nextEvent.time);

  return sorted;
}
