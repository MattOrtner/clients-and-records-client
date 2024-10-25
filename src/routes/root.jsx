import { createContext, useState } from "react";
import { Navigate, Outlet, redirect, useLoaderData } from "react-router-dom";
import NavBarTab from "./components/navBarTab";
import {
  mdiAccountMultipleOutline,
  mdiCurrencyUsd,
  mdiHomeOutline,
} from "@mdi/js";
import Login from "./login";
import { hasLocalEmail, loginAttempt } from "../auth";

export const AuthContext = createContext();

export default function Root() {
  const hasEmail = useLoaderData();

  const [user, setUser] = useState({});
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleInput = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    if (name === "email") {
      setEmail(value);
    } else {
      setPass(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginResponse = await loginAttempt(email, pass);
    console.log("loginResponse HANDLESUBMIT: ", loginResponse);
    return null;
  };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {Object.keys(user).length === 0 ? (
        <Login
          handleInput={handleInput}
          email={email}
          pass={pass}
          hasEmail={hasEmail}
          handleSubmit={handleSubmit}
        />
      ) : (
        <div className="flex flex-col items-center w-full">
          <Outlet />
          <nav id="nav-bar">
            <NavBarTab route={"/landing"} svg={mdiHomeOutline} />
            <NavBarTab route={"clients"} svg={mdiAccountMultipleOutline} />
            {/* <NavBarTab route={"calendar"} svg={mdiCalendarMultiselectOutline} /> */}
            <NavBarTab route={"payments"} svg={mdiCurrencyUsd} />
          </nav>
        </div>
      )}
    </AuthContext.Provider>
  );
}
