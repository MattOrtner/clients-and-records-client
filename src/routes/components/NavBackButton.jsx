import { mdiChevronLeft } from "@mdi/js";
import Icon from "@mdi/react";
import { useNavigate } from "react-router-dom";

const NavBackButton = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed top-8 left-4 w-full flex justify-start items-center">
      <Icon
        onClick={() => {
          navigate(-1);
        }}
        path={mdiChevronLeft}
        size={1.75}
      />
    </div>
  );
};
export default NavBackButton;