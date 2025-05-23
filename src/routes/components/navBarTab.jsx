import Icon from "@mdi/react";
import { NavLink } from "react-router-dom";

const NavBarTab = ({ route, svg, styles, title }) => {
  const screenWidth = window.innerWidth;
  const isDesktop = screenWidth > 400;
  return (
    <NavLink
      to={route}
      className={({ isActive }) =>
        [
          "border-2",
          "flex",
          "w-full",
          "justify-center",
          "rounded-md",
          "p-2",
          "bg-white",
          `${styles}`,
          isActive && isDesktop
            ? "border-green-500"
            : isActive
            ? "border-t-green-500 border-y-4"
            : "",
        ].join(" ")
      }
    >
      <Icon path={svg} size={1.25} style={{ marginRight: "0.5rem" }} />
      {isDesktop && <h1 className="text-xl">{title}</h1>}
    </NavLink>
  );
};
export default NavBarTab;
