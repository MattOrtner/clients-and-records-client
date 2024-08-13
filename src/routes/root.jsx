import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";

import Icon from "@mdi/react";
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
    <div className="flex flex-col items-center h-full w-full">
      <Outlet />
      <div className="fixed bottom-0 flex w-full">
        <NavLink
          to={`/`}
          className="border-2 flex-1 flex justify-center rounded-md p-2"
        >
          <Icon path={mdiHomeOutline} size={1.25} />
        </NavLink>
        <NavLink
          to={`contacts`}
          className="border-2 flex-1 flex justify-center rounded-md p-2"
        >
          <Icon path={mdiAccountMultipleOutline} size={1.25} />
        </NavLink>
        <NavLink
          to="calendar"
          className="border-2 flex-1 flex justify-center rounded-md p-2"
        >
          <Icon path={mdiCalendarMultiselectOutline} size={1.25} />
        </NavLink>
        <NavLink
          to="payments"
          className="border-2 flex-1 flex justify-center rounded-md p-2"
        >
          <Icon path={mdiCurrencyUsd} size={1.25} />
        </NavLink>
      </div>
    </div>
  );
}
