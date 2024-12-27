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
    })
    .catch((error) => {
      console.error("client: getCliensApi(): ", error);
    });
}

export async function deleteSession(params) {
  let { clientId, sessionId } = params;
  return await fetch(
    `http://localhost:3001/${clientId}/sessions/${sessionId}`,
    {
      method: "DELETE",
    }
  )
    .then((response) => {
      console.log("response: ", response);
      return response.json();
    })
    .catch((error) => {
      console.error("ERROR-getClientSessions", error);
    });
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
