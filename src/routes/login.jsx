import { Form } from "react-router-dom";
import WelcomeModal from "./components/WelcomeModal/WelcomeModal";
import { useState } from "react";

export default function Login({
  handleLoginInput,
  pass,
  email,
  handleLoginSubmit,
}) {
  const [isOpen, setIsOpen] = useState(true);
  const handleModal = () => {
    setIsOpen(!isOpen);
  };
  const handleCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center b-orange">
      <WelcomeModal
        isOpen={isOpen}
        handleCloseModal={handleCloseModal}
        handleModal={handleModal}
      />
      <div className="h-[50%] w-[300px] flex flex-col justify-center items-center gap-8">
        <h1 className="text-4xl font-serif w-full ">Welcome</h1>
        <Form method="POST" className="flex flex-col gap-4 self-end w-full">
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={handleLoginInput}
          />
          <input
            className="p-2 border-2 border-gray-300 rounded-md"
            type="password"
            placeholder="password"
            name="pass"
            value={pass}
            onChange={handleLoginInput}
          />
          <button
            className="bg-blue-500 text-white p-2 rounded-md"
            onClick={handleLoginSubmit}
          >
            Login
          </button>
        </Form>
      </div>
    </div>
  );
}
