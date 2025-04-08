import ModalMessage from "./ModalMessage";

const WelcomeModal = ({ handleCloseModal, handleModal }) => {
  return (
    <div
      className="fixed left-0 top-0 h-screen w-screen px-4 flex justify-center items-center bg-black bg-opacity-50"
      onClick={handleCloseModal}
    >
      <ModalMessage handleModal={handleModal} />
    </div>
  );
};
export default WelcomeModal;
