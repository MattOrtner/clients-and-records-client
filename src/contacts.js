import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

async function getContactsApi(userId) {
  return await fetch(`http://localhost:3001/${userId}/clients`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error("client: getCliensApi(): ", error);
    });
}

export async function getContacts(userId) {
  const response = await getContactsApi(userId);
  return response;
  // logic for search in current data
  // let contacts = await localforage.getItem("contacts");
  // if (query) {
  //   contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
  // }
  // return contacts.sort(sortBy("last", "createdAt"));
}

export async function createContact() {
  // await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let contact = {
    id,
    createdAt: Date.now(),
    first: "",
    last: "",
    sessions: [],
  };
  let contacts = await getContacts();
  contacts.unshift(contact);
  await set(contacts);
  return contact;
}

export async function cancelContact(id) {
  // await fakeNetwork();
  let contacts = await localforage.getItem("contacts");
  let index = contacts.findIndex((contact) => contact.id === id);
  if (index > -1) {
    contacts.splice(index, 1);
    await set(contacts);
    return true;
  }
  return false;
}

export async function getContact(clientId) {
  return await fetch(`http://localhost:3001/2/clients/${clientId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error("client: getCliensApi(): ", error);
    });
}

export async function getInfoForContactPage(id) {
  // await fakeNetwork(`contact:${id}`);
  let contacts = await localforage.getItem("contacts");
  let contact = contacts.find((contact) => contact.id === id);
  const necessaryData = {
    id: contact.id,
    first: contact.first,
    last: contact.last,
    emergencyContact: {
      first: contact.emergencyContact.first,
      last: contact.emergencyContact.last,
      phoneNumber: contact.emergencyContact.phoneNumber,
    },
    sessions: contact.sessions ?? [],
  };
  return necessaryData ?? null;
}

// IF FOR IS NOT FULLY FILLED IN THEN IT WONT SAVE ANYTHING BUT EMAIL, RATE, OCCURANCE
//    CREATE EDIT ROUTE FOR EACH SESSION?

async function createContactAPI(updates) {
  const { first, last, email, rate, occurrence, phone_number } = updates;

  fetch("http://localhost:3001/clients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      first,
      last,
      email,
      rate,
      occurrence,
      phone_number,
    }),
  })
    .then((response) => {
      console.log("response in createContactAPI", response);
      return response.text();
    })
    .then((data) => {
      console.log("data: ", data);
      alert(data);
      // getMerchant();
    });
}

export async function updateContact(id, updates) {
  console.log("updates: ", updates);
  const response = await createContactAPI(updates);
  console.log("response from PG:", response);
  // const apiResponse = await createContactAPI(updates);
  // console.log("apiResponse: ", apiResponse);
  let contacts = await localforage.getItem("contacts");
  let contact = contacts.find((contact) => contact.id === id);

  if (!contact) throw new Error("No contact found for", id);
  Object.assign(contact, updates);
  await set(contacts);
  return contact;
}

export async function deleteContact(id) {
  let contacts = await localforage.getItem("contacts");
  let index = contacts.findIndex((contact) => contact.id === id);
  if (index > -1) {
    contacts.splice(index, 1);
    await set(contacts);
    return true;
  }
  return false;
}

function set(contacts) {
  return localforage.setItem("contacts", contacts);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  // fakeCache[key] = true;
  // return new Promise((res) => {
  // setTimeout(res, Math.random() * 800);
  // });
}
