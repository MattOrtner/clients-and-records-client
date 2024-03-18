import localforage from "localforage";
import { useState } from "react";
// console.log("createTimeString", createTimeString);

export async function createPassword(pass) {
  await localforage.setItem("pass");
  return "Password created";
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
