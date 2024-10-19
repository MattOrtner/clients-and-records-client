import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBarTab from "./components/navBarTab";

import {
  mdiAccountMultipleOutline,
  mdiCurrencyUsd,
  mdiHomeOutline,
} from "@mdi/js";
import Login from "./login";

export async function loader() {}
export function action() {
  return null;
}
export const AuthContext = createContext();

export default function Root() {
  const [user, setUser] = useState(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  const userContext = {
    user,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={userContext}>
      {!userContext.user ? (
        <Login />
      ) : (
        <div className="flex flex-col items-center w-full">
          <Outlet />
          <nav id="nav-bar">
            <NavBarTab route={"/"} svg={mdiHomeOutline} />
            <NavBarTab route={"clients"} svg={mdiAccountMultipleOutline} />
            {/* <NavBarTab route={"calendar"} svg={mdiCalendarMultiselectOutline} /> */}
            <NavBarTab route={"payments"} svg={mdiCurrencyUsd} />
          </nav>
        </div>
      )}
    </AuthContext.Provider>
  );
}
