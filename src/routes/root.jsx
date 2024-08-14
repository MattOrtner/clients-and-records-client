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
      <nav id="nav-bar">
        <NavLink
          to={`/`}
          className={({ isActive, isPending, isTransitioning }) =>
            [
              "border-2",
              "flex-1",
              "flex",
              "justify-center",
              "rounded-md",
              "p-2",
              isPending ? "bg-red-300" : "",
              isActive ? "border-t-blue-300 border-y-4" : "",
              isTransitioning ? "bg-green-400 " : "",
            ].join(" ")
          }
        >
          <Icon path={mdiHomeOutline} size={1.25} />
        </NavLink>
        <NavLink
          to={`contacts`}
          className={({ isActive, isPending, isTransitioning }) =>
            [
              "border-2",
              "flex-1",
              "flex",
              "justify-center",
              "rounded-md",
              "p-2",
              isPending ? "bg-red-400" : "",
              isActive ? "border-t-blue-300 border-y-4" : "",
              isTransitioning ? "bg-green-400" : "",
            ].join(" ")
          }
        >
          <Icon path={mdiAccountMultipleOutline} size={1.25} />
        </NavLink>
        <NavLink
          to="calendar"
          className={({ isActive, isPending, isTransitioning }) =>
            [
              "border-2",
              "flex-1",
              "flex",
              "justify-center",
              "rounded-md",
              "p-2",
              isPending ? "bg-red-400" : "",
              isActive ? "border-t-blue-300 border-y-4" : "",
              isTransitioning ? "bg-green-400" : "",
            ].join(" ")
          }
        >
          <Icon path={mdiCalendarMultiselectOutline} size={1.25} />
        </NavLink>
        <NavLink
          to="payments"
          className={({ isActive, isPending, isTransitioning }) =>
            [
              "border-2",
              "flex-1",
              "flex",
              "justify-center",
              "rounded-md",
              "p-2",
              isPending ? "bg-red-400" : "",
              isActive ? "border-t-blue-300 border-y-4" : "",
              isTransitioning ? "bg-green-400" : "",
            ].join(" ")
          }
        >
          <Icon path={mdiCurrencyUsd} size={1.25} />
        </NavLink>
      </nav>
    </div>
  );
}
