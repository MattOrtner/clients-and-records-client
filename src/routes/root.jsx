import { useState } from "react";
import { Outlet, redirect } from "react-router-dom";
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
  const [email, setEmail] = useState("eeemail@mail.com");
  const [pass, setPass] = useState("characters");

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
    const response = await attemptLogin(email, pass);
    if (response.status !== 200) {
      alert("Invalid email/pass combination");
    } else {
      setUser({ id: response.id, first: response.first });
    }
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
        <NavBarTab
          route={`${user.id}/clients`}
          svg={mdiAccountMultipleOutline}
        />
        {/* <NavBarTab route={"calendar"} svg={mdiCalendarMultiselectOutline} /> */}
        <NavBarTab route={`${user.id}/payments`} svg={mdiCurrencyUsd} />
      </nav>
    </div>
  );
}
