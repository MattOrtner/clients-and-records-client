import Icon from "@mdi/react";
import { useNavigate } from "react-router-dom";
import { mdiHomeOutline } from "@mdi/js";

export default function NavigateHomeButton() {
  const navigate = useNavigate();
  function handleHome() {
    navigate("/");
  }

  return (
    <button
      name="home"
      aria-label="home"
      value="true"
      className="w-14 h-14"
      onClick={handleHome}
    >
      <Icon path={mdiHomeOutline} />
    </button>
  );
}
