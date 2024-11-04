import { createContext, useState } from "react";
import { Navigate, Outlet, redirect } from "react-router-dom";
import NavBarTab from "./components/navBarTab";
import {
  mdiAccountMultipleOutline,
  mdiCurrencyUsd,
  mdiHomeOutline,
  // mdiCalendarMultiselectOutline,
} from "@mdi/js";
import Login from "./login";
import { attemptLogin } from "../auth";

export default function Root() {
  const [user, setUser] = useState({});
  const [email, setEmail] = useState("mail@mail.com");
  const [pass, setPass] = useState("password");

  const handleLoginInput = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    if (name === "email") {
      setEmail(value);
    } else {
      setPass(value);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const { status, id, first } = await attemptLogin(email, pass);
    setUser({ id, first });
  };

  if (Object.keys(user).length === 0) {
    return (
      <Login
        handleLoginInput={handleLoginInput}
        email={email}
        pass={pass}
        handleLoginSubmit={handleLoginSubmit}
      />
    );
  }

  return (
    <div className="flex flex-col items-center w-full">
      <Outlet context={[user, setUser]} />
      <nav id="nav-bar">
        <NavBarTab route={`/`} svg={mdiHomeOutline} />
        <NavBarTab route="clients" svg={mdiAccountMultipleOutline} />
        {/* <NavBarTab route={"calendar"} svg={mdiCalendarMultiselectOutline} /> */}
        <NavBarTab route="payments" svg={mdiCurrencyUsd} />
      </nav>
    </div>
  );
}
