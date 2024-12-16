export async function getContacts(userId) {
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

export async function createContact(userId, clientData) {
  return await fetch(`http://localhost:3001/${userId}/clients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(clientData),
  })
    .then((response) => {
      return response.text();
    })
    .catch((error) => {
      console.error("clientCreateContact(): ", error);
    });
}

export async function cancelContact(id) {}

export async function getProfile(clientId) {
  return await fetch(`http://localhost:3001/clients/${clientId}/profile`, {
    method: "GET",
  })
    .then((response) => {
      console.log("response", response);
      return response.json();
      // return response.text();
    })
    .catch((error) => {
      console.error("client: getCliensApi(): ", error);
    });
}

export async function getContact(clientId) {
  return await fetch(`http://localhost:3001/clients/${clientId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error("client: getCliensApi(): ", error);
    });
}

export async function getInfoForContactPage(id) {}

export async function updateContact(id, updates) {}

export async function deleteContact(id) {}
