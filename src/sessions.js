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
  return await fetch(
    `http://localhost:3001/${params.userId}/clients/${params.clientId}/sessions/${params.sessionId}`,
    {
      method: "GET",
    }
  )
    .then((response) => {
      return response.json();
      // return response.text();
    })
    .catch((error) => {
      console.error("client: getCliensApi(): ", error);
    });
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

export async function updateSession(clientId, sessionId, updates) {
  return await fetch(
    `http://localhost:3001/${clientId}/sessions/${sessionId}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    }
  );
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
