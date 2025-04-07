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
          className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center"
          onClick={handleCloseModal}
        >
          <div className="bg-white p-4 rounded-md shadow-md">
            <ModalMessage />
            <button
              className="bg-blue-500 text-white p-2 rounded-md mt-4"
              onClick={handleModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default WelcomeModal;
