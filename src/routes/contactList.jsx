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

export async function loader(query) {
  const contacts = await getContacts();
  console.log("contacts", contacts);
  return { contacts };
}
export async function action() {
  const contact = await createContact();
  // return { contact };
  return redirect(`/contacts/${contact.id}/edit`);
}
export default function ContactList() {
  const { contacts, q } = useLoaderData();
  console.log("contacts", contacts);

  const submit = useSubmit();
  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);
  return (
    <>
      <div id="contacts-page">
        <span className="flex w-full justify-center pt-2">
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
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink to={`${contact.id}`}>
                    {contact.first || contact.last ? (
                      <div className="text-xl">
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
            <p>No contacts</p>
          )}
        </nav>
      </div>
    </>
  );
}
