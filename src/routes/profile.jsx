import { Form, useLoaderData } from "react-router-dom";
import { getContact, deleteContact } from "../contacts";
import { useState } from "react";
import NavBackButton from "./components/NavBackButton";

export async function loader({ params }) {
  const contact = await getContact(params.contactId);
  return { contact };
}

export async function action({ request, params }) {}

export default function Profile() {
  const { contact } = useLoaderData();

  const [isBlurPhone, setIsBlurPhone] = useState("blur-sm");

  const {
    first,
    last,
    email,
    phone_number,
    occurance,
    rate,
    emergencyContact,
  } = contact;

  const tax = rate * 0.2;

  const handlePhoneBlur = () => {
    setIsBlurPhone((isBlur) =>
      isBlur === "blur-[3px]" ? "blur-none" : "blur-[3px]"
    );
  };

  return (
    <div className="flex flex-col items-center m-8 gap-4 w-full">
      <NavBackButton />
      <h1 className="text-2xl">
        {first} {last}
      </h1>
      <p className="text-xl">email: {email}</p>
      <div className="flex gap-2 items-center">
        <p className="text-xl">phone:</p>
        <p className={` ${isBlurPhone}`} onClick={handlePhoneBlur}>
          {phone_number}
        </p>
      </div>
      <p className="text-xl">rate: $ {rate}</p>
      <p className="text-xl">occurance: {occurance}</p>
      <p className="text-xl">tax: $ {tax}</p>
      {emergencyContact && (
        <div className="flex flex-col gap-4">
          <h1 className="text-xl">Emergency Contact</h1>
          <div>First: {emergencyContact.first}</div>
          <div>Last: {emergencyContact.last}</div>
        </div>
      )}
      <Form method="delete" action="delete">
        <button type="submit" className="delete-button">
          Delete Contact
        </button>
      </Form>
    </div>
  );
}