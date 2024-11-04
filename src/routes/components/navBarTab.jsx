import Icon from "@mdi/react";
import { NavLink } from "react-router-dom";

const NavBarTab = ({ route, svg }) => {
  return (
    <NavLink
      to={route}
      className={({ isActive }) =>
        [
          "border-2",
          "flex-1",
          "flex",
          "justify-center",
          "rounded-md",
          "p-2",
          "bg-white",
          isActive ? "border-t-blue-300 border-y-4" : "",
        ].join(" ")
      }
    >
      <Icon path={svg} size={1.25} />
    </NavLink>
  );
};
export default NavBarTab;
