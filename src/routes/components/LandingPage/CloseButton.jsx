const CloseButton = ({ handleModal, p = 2 }) => {
  return (
    <button
      type="button"
      onClick={handleModal}
      className={`rounded-md bg-[#e9a843] ${p}-1 inline-flex items-center justify-center text-white hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500`}
    >
      <span className="sr-only">Close menu</span>
      <svg
        className="h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  );
};
export default CloseButton;
