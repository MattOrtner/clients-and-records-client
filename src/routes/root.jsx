import { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBarTab from "./components/navBarTab";

import {
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
        <NavBarTab route={"clients"} svg={mdiAccountMultipleOutline} />
        {/* <NavBarTab route={"calendar"} svg={mdiCalendarMultiselectOutline} /> */}
        <NavBarTab route={"payments"} svg={mdiCurrencyUsd} />
      </nav>
    </div>
  );
}
