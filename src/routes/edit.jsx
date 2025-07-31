import { Form, redirect } from "react-router-dom";
import { createContact } from "../contacts";

export async function action({ request, params }) {
  let formData = await request.formData();
  let intent = formData.get("intent");
  if (intent === "save") {
    const clientData = Object.fromEntries(formData);
    for (const prop in clientData) {
      if (clientData[prop] === "") {
        alert(`Please fill in value for ${prop}`);
        return null;
      }
    }
    const response = await createContact(params.userId, clientData);
    const parsed = JSON.parse(response);
    return redirect(`/${params.userId}/clients/${parsed.id}`);
  } else {
    return redirect(`/${params.userId}/clients`);
  }
}

export default function EditContact() {
  return (
    <Form method="post" className="contact-form sm:w-1/3">
      <div className="flex flex-col gap-2 font-light">
        <span className="text-2xl">New Client</span>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
        />
        <label className="flex flex-col">
          <span>Email</span>
          <input
            placeholder="someone@somewhere.com"
            aria-label="email"
            type="email"
            name="email"
          />
        </label>
        <label className="flex flex-col">
          <span>Phone Number</span>
          <input
            aria-label="phone number"
            placeholder="000-000-0000"
            type="phone"
            name="phonenumber"
          />
        </label>
        <span>Rate</span>
        <div className="flex gap-4 items-center w-full">
          $
          <input
            aria-label="rate"
            placeholder="75"
            type="number"
            name="rate"
            className="w-full"
          />
        </div>
      </div>
      <p className="flex gap-4">
        <button type="submit" name="intent" value="cancel">
          Cancel
        </button>
        <button
          type="submit"
          name="intent"
          value="save"
          className="bg-blue-300"
        >
          Save
        </button>
      </p>
    </Form>
  );
}
