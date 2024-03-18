import { Form, useLoaderData } from "react-router-dom";
import { validatePassword, hasLocalPassord } from "../auth";
import { redirect } from "react-router-dom";
import { useState } from "react";

export async function action(request, params) {
  const isValid = await validatePassword();
  if (isValid) {
    return redirect("/");
  } else {
    window.alert("Wrong.");
  }
}

export async function loader() {
  return await hasLocalPassord();
}

export default function Login({ setIsLoggedIn, isLoggedIn }) {
  const hasPassword = useLoaderData();

  console.log("hasPassword", hasPassword);
  const handleLogin = async () => {
    setIsLoggedIn((curr) => !curr);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className=" h-3/4 w-3/4 flex flex-col justify-center items-center gap-8">
        <h1 className="text-3xl text-center font-serif w-full">Login</h1>
        <Form method="POST" className="flex flex-col gap-4 self-end w-full ">
          {isLoggedIn ? (
            <input
              type="password"
              placeholder="Password"
              className="p-2 border-2 border-gray-300 rounded-md"
            />
          ) : (
            <input
              type="password"
              placeholder="Create password"
              className="p-2 border-2 border-gray-300 rounded-md"
            />
          )}
          <button
            className="bg-blue-500 text-white p-2 rounded-md"
            onClick={handleLogin}
          >
            Login
          </button>
          <button>Forgot password?</button>
        </Form>
      </div>
    </div>
  );
}
