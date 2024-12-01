import localforage from "localforage";
import dateAsString from "../src/currentDateString";

export async function createSession(clientId, sessionInfo) {
  return fetch(`http://localhost:3001/sessions/create-session/${clientId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sessionInfo),
  })
    .then((response) => {
      console.log("response", response);
      return response.json();
    })
    .catch((error) => {
      console.error("ERROR-createSession", error);
    });
}

export async function getSession(params) {
  let { contactId, sessionId } = params;
  const contacts = await localforage.getItem("contacts");
  const contact = contacts.find((contact) => contact.id === contactId);
  if (!contact) throw new Error("No contact found for", contactId);
  return contact.sessions.find((session) => session.id === sessionId);
}

export async function deleteSession(params) {
  let { contactId, sessionId } = params;
  let contacts = await localforage.getItem("contacts");
  let contact = contacts.find((contact) => contact.id === contactId);
  let index = contact.sessions.findIndex((session) => session.id === sessionId);
  console.log("deleted session");
  if (index > -1) {
    contact.sessions.splice(index, 1);
    await set(contacts);
    return true;
  } else {
    return false;
  }
}

export async function getClientSessions({ userId, clientId }) {
  // organize the sessions by date first
  return await fetch(
    `http://localhost:3001/${userId}/clients/sessions/${clientId}`,
    {
      method: "GET",
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error("ERROR-getClientSessions", error);
    });
}

export async function updateSession(contactId, sessionId, updates) {
  let contacts = await localforage.getItem("contacts");
  let contact = contacts.find((contact) => contact.id === contactId);
  let session = contact.sessions.find((session) => session.id === sessionId);
  Object.assign(session, updates);
  await set(contacts);
  return session;
}

function set(contacts) {
  return localforage.setItem("contacts", contacts);
}

export async function getTodaysSessions() {
  let contacts = await localforage.getItem("contacts");
  if (contacts) {
    const todaysSessions = [];
    for (const contact of contacts) {
      const { id, first, last } = contact;
      const contactId = id;
      for (const session of contact.sessions) {
        if (session.date === dateAsString) {
          const { id, time } = session;
          todaysSessions.push({ id, contactId, time, first, last });
        }
      }
    }
    return todaysSessions;
  }
}
export async function getUnpaidSessions() {
  let contacts = await localforage.getItem("contacts");
  if (contacts) {
    const unpaidSessions = [];
    for (const contact of contacts) {
      for (const session of contact.sessions) {
        if (session.paid === "") {
          unpaidSessions.push(session);
        }
      }
    }
    return unpaidSessions;
  }
}
// let fakeCache = {};
// async function fakeNetwork(key) {
//   if (!key) {
//     fakeCache = {};
//   }

//   if (fakeCache[key]) {
//     return;
//   }

//   fakeCache[key] = true;
//   return new Promise((res) => {
//     setTimeout(res, Math.random() * 800);
//   });
// }
