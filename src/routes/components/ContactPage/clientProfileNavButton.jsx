import { mdiAccountCircleOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { NavLink } from "react-router-dom";

function ClientProfileNavButton({ userId, clientId }) {
  return (
    <NavLink to={`/${userId}/clients/${clientId}/profile`}>
      <button
        name="client-profile"
        aria-label="client-profile"
        className="flex justify-center items-center"
      >
        <Icon
          path={mdiAccountCircleOutline}
          color="rgb(59 130 246)"
          size={1.4}
        />
      </button>
    </NavLink>
  );
}
export default ClientProfileNavButton;
