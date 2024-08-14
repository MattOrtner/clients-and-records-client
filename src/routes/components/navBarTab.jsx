import Icon from "@mdi/react";
import { NavLink } from "react-router-dom";

const NavBarTab = ({ route, svg }) => {
  return (
    <NavLink
      to={route}
      className={({ isActive, isPending, isTransitioning }) =>
        [
          "border-2",
          "flex-1",
          "flex",
          "justify-center",
          "rounded-md",
          "p-2",
          "bg-white",
          // isPending ? "bg-red-300" : "",
          isActive ? "border-t-blue-300 border-y-4" : "",
          // isTransitioning ? "bg-green-400 " : "",
        ].join(" ")
      }
    >
      <Icon path={svg} size={1.25} />
    </NavLink>
  );
};
export default NavBarTab;
