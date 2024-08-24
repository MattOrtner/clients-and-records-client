import { mdiAccountCircleOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { NavLink } from "react-router-dom";

function ContactProfileNavButton({ contactId, size }) {
  return (
    <NavLink to={`/contacts/${contactId}/profile`}>
      <button
        name="client-profile"
        aria-label="client-profile"
        className="flex justify-center items-center"
      >
        <Icon
          path={mdiAccountCircleOutline}
          color="rgb(59 130 246)"
          size={size}
        />
      </button>
    </NavLink>
  );
}
export default ContactProfileNavButton;
