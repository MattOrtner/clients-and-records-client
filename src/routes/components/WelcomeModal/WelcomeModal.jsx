import { useState } from "react";
import ModalMessage from "./ModalMessage";

const WelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const handleModal = () => {
    setIsOpen(!isOpen);
  };
  const handleCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };
  const handleEscape = (e) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };
  document.addEventListener("keydown", handleEscape);
  document.addEventListener("click", handleCloseModal);
  return (
    <div>
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center"
          onClick={handleCloseModal}
        >
          <div className="bg-white max-w-[500px] p-4 rounded-md shadow-md">
            <ModalMessage handleModal={handleModal} />
          </div>
        </div>
      )}
    </div>
  );
};
export default WelcomeModal;
