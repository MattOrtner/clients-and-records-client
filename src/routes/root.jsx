import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBarTab from "./components/navBarTab";
import {
  mdiAccountMultipleOutline,
  mdiCurrencyUsd,
  mdiHomeOutline,
} from "@mdi/js";
import Login from "./login";
import { attemptLogin } from "../auth";
import { Analytics } from "@vercel/analytics/react";

export default function Root() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [email, setEmail] = useState("default@mail.com");
  const [pass, setPass] = useState("default@mail.com");
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    e.preventDefault();
    if (!email || !pass) {
      alert("Ensure that both the email and password fields are not empty.");
      setIsLoading(false);
      return;
    }
    const response = await attemptLogin(email, pass);
    if (response.status !== 200) {
      alert("Invalid email/pass combination");
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setEmail("");
      setPass("");
      setUser({ id: response.id, first: response.first });
      return navigate(`/${response.id}/clients`);
    }
  };
  return (
    <div className="flex flex-col items-center w-full">
      {Object.keys(user).length === 0 ? (
        <Login
          handleLoginInput={handleLoginInput}
          email={email}
          pass={pass}
          handleLoginSubmit={handleLoginSubmit}
          isLoading={isLoading}
        />
      ) : (
        <>
          <Outlet context={[user, setUser]} />
          <Analytics />
          <nav className="nav-bar sm:top-0 sm:left-0 sm:bg-gray-100 sm:flex-col sm:w-1/6 max-w-[400px]">
            {/* <NavBarTab route={`/`} svg={mdiHomeOutline} /> */}
            <NavBarTab
              route={`${user.id}/clients`}
              svg={mdiAccountMultipleOutline}
              title={"Clients"}
            />
            <NavBarTab
              route={`${user.id}/payments`}
              svg={mdiCurrencyUsd}
              title={"Payments"}
            />
          </nav>
        </>
      )}
    </div>
  );
}
