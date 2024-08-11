import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";

import Icon from "@mdi/react";
import {
  mdiSpaceInvaders,
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
          className="border-2 border-black flex-1 flex justify-center rounded-md p-2"
        >
          <Icon path={mdiHomeOutline} size={2} />
        </NavLink>
        <NavLink
          to={`contacts`}
          className="border-2 border-black flex-1 flex justify-center rounded-md p-2"
        >
          <Icon path={mdiSpaceInvaders} size={2} />
        </NavLink>
        <NavLink
          to=""
          className="border-2 border-black flex-1 flex justify-center rounded-md p-2"
        >
          <Icon path={mdiCalendarMultiselectOutline} size={2} />
        </NavLink>
        <NavLink
          to=""
          className="border-2 border-black flex-1 flex justify-center rounded-md p-2"
        >
          <Icon path={mdiCurrencyUsd} size={2} />
        </NavLink>
      </div>
    </div>
  );
}
