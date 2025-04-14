import { Form, useLoaderData, redirect } from "react-router-dom";
import { createContact } from "../contacts";

export async function action({ request, params }) {
  let formData = await request.formData();
  let intent = formData.get("intent");
  if (intent === "save") {
    const clientData = Object.fromEntries(formData);
    const response = await createContact(params.userId, clientData);
    const parsed = JSON.parse(response);
    return redirect(`/${params.userId}/clients/${parsed.id}`);
  } else {
    return redirect(`/${params.userId}/clients`);
  }
}

export default function EditContact() {
  // const { contact } = useLoaderData();
  return (
    <Form method="post" id="contact-form">
      <div className="flex flex-col gap-2 font-light">
        <span className="text-2xl">New Client</span>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          // defaultValue={contact.first}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          // defaultValue={contact.last}
        />
        <label className="flex flex-col">
          <span>Email</span>
          <input
            placeholder="someone@somewhere.com"
            aria-label="email"
            type="email"
            name="email"
            // defaultValue={contact.email}
          />
        </label>
        <label className="flex flex-col">
          <span>Phone Number</span>
          <input
            aria-label="phone number"
            placeholder="000-000-0000"
            type="phone"
            name="phonenumber"
            // defaultValue={contact.phone_number}
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
            // defaultValue={contact.rate}
            className="w-full"
          />
        </div>
        {/* <label>
          <span className="pr-4">Occurrence</span>
          <input
            aria-label="occurrence"
            placeholder="1"
            type="text"
            name="occurrence"
            // defaultValue="1"
          />
        </label> */}
      </div>
      <p className="font-light">
        <label className="flex gap-2 font-light">
          {/* <span className="text-2xl pt-4">Emergency Contact</span>
            <span>Name</span>
            <input
              placeholder="First"
              aria-label="First name"
              type="text"
              name="emergencyContact.first"
              defaultValue={contact.emergencyContact.first}
            />
            <input
              placeholder="Last"
              aria-label="Last name"
              type="text"
              name="emergencyContact.last"
              defaultValue={contact.emergencyContact.last}
            /> */}
          {/* <label>
              <span>Phone Number</span>
              <input
                aria-label="phone number"
                placeholder="000-000-0000"
                type="phone"
                name="phone_number"
                defaultValue={contact.emergencyContact.phone_number}
              />
            </label> */}
        </label>
      </p>
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
