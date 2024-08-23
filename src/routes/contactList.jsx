import { useEffect, useState } from "react";
import {
  NavLink,
  useLoaderData,
  Form,
  useSubmit,
  redirect,
} from "react-router-dom";
import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";
import { getContacts, createContact } from "../contacts";

import { hasLocalPassord } from "../auth";

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts, q };
}
export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}
export default function ContactList() {
  const { contacts, q } = useLoaderData();

  const submit = useSubmit();
  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);
  return (
    <>
      <div className="w-full">
        <span className="flex w-full p-2">
          <Form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              autoComplete="off"
              defaultValue={q}
              onChange={(event) => {
                const isFirstSearch = q == null;
                submit(event.currentTarget.form, { replace: !isFirstSearch });
              }}
            />
          </Form>
          <Form method="post">
            <button className="bg-blue-500 text-white my-8" type="submit">
              <Icon path={mdiPlus} size={1} />
            </button>
          </Form>
        </span>
        <nav className="w-full flex flex-col items-center  gap-4">
          {contacts.length ? (
            <ul className="w-full">
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`${contact.id}`}
                    className="flex justify-center items-center w-full rounded-lg"
                  >
                    {contact.first || contact.last ? (
                      <div className="text-xl w-[90%] text-center border-gray-200 border-2 rounded-lg py-1 mb-2">
                        {contact.first} {contact.last}
                      </div>
                    ) : (
                      <i>No Name</i>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-2xl">Add a contact</p>
          )}
        </nav>
      </div>
    </>
  );
}
