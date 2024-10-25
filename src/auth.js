import localforage from "localforage";

export async function loginAttempt(email, pass) {
  return await fetch(`http://localhost:3001/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email, pass: pass }),
  })
    .then((response) => {
      console.log("response auth.js: ", response);
      return response.json();
    })
    .catch((error) => {
      console.error("client: loginAttempt(): ", error);
    });
}

export async function hasLocalPassord() {
  let password = await localforage.getItem("pass");
  if (password) {
    return true;
  } else {
    return false;
  }
}

export async function validatePassword(pass) {
  let password = await localforage.getItem("pass");
  if (pass === password) {
    await localforage.setItem("lastLogin", new Date());
    return true;
  } else {
    return false;
  }
}

export async function passReValidation() {
  let lastLogIn = await localforage.getItem("lastLogin");
  let now = new Date();
}

const createTimeString = () => {
  let now = new Date();
  // 16 - 23

  // return now.toString();
};
