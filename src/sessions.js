import localforage from "localforage";

export async function createSession(contactId) {
  let contacts = await localforage.getItem("contacts");
  let contact = contacts.find((contact) => contact.id === contactId);
  if (!contact) throw new Error("No contact found for", contactId);
  if (!contact.sessions) contact.sessions = [];
  let session = {
    id: Math.random().toString(36).substring(2, 9),
    notes: "",
    paid: false,
    date: undefined,
  };
  contact.sessions.unshift(session);
  console.log("create session");
  await set(contacts);
  return session.id;
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

export async function getSessions(id) {
  let contacts = await localforage.getItem("contacts");
  let contact = contacts.find((contact) => contact.id === id);
  return contact.sessions ?? null;
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
