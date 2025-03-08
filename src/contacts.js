export async function getContacts(userId) {
  return await fetch(`${process.env.REACT_APP_API}${userId}/clients`, {
    method: "GET",
  })
    .then((response) => {
      console.log("response get contacts", response);
      return response.json();
    })
    .catch((error) => {
      console.log("error get contacts", error);
      console.error("client: getCliensApi(): ", error);
    });
}

export async function createContact(userId, clientData) {
  return await fetch(`${process.env.REACT_APP_API}${userId}/clients`, {
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
  return await fetch(
    `${process.env.REACT_APP_API}clients/${clientId}/profile`,
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

export async function getContact(clientId) {
  return await fetch(`${process.env.REACT_APP_API}clients/${clientId}`, {
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

export async function deleteClient(userId, clientId) {
  // write a fetch request to delete a contact
  return await fetch(
    `${process.env.REACT_APP_API}${userId}/clients/${clientId}`,
    {
      method: "DELETE",
    }
  )
    .then((response) => {
      console.log("response", response);
      return response.text();
    })
    .catch((error) => {
      console.error("client: deleteClient(): ", error);
    });
}
