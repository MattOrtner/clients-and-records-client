import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import NavBarTab from "./components/navBarTab";

import {
  mdiSpaceInvaders,
  mdiAccountOutline,
  mdiAccountMultipleOutline,
  mdiCalendarMultiselectOutline,
  mdiCurrencyUsd,
  mdiHomeOutline,
} from "@mdi/js";

export function action() {
  return null;
}
export async function loader() {
  return null;
}
export default function Root() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <div className="flex flex-col items-center w-full">
      <Outlet />
      <nav id="nav-bar">
        <NavBarTab route={"/"} svg={mdiHomeOutline} />
        <NavBarTab route={"contacts"} svg={mdiAccountMultipleOutline} />
        <NavBarTab route={"calendar"} svg={mdiCalendarMultiselectOutline} />
        <NavBarTab route={"payments"} svg={mdiCurrencyUsd} />
      </nav>
    </div>
  );
}
