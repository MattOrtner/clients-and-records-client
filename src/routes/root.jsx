import { useEffect, useState } from "react";
import {
  Outlet,
  NavLink,
  useLoaderData,
  Form,
  redirect,
  useSubmit,
  useNavigate,
} from "react-router-dom";

import { getContacts, createContact } from "../contacts";
import { hasLocalPassord } from "../auth";

export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts, q };
}

export default function Root() {
  const { contacts, q } = useLoaderData();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isPass, setIsPass] = useState();
  const navigate = useNavigate();

  const submit = useSubmit();
  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);
  return (
    <>
      <div id="sidebar">
        <span className="flex w-full justify-center gap-2 pt-2">
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
        </span>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink to={`/contacts/${contact.id}`}>
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
        <div className="fixed bottom-12 h-9 right-10 min-w-[50%]">
          <Form method="post">
            <button
              className="w-[100%] bg-blue-500 text-white text-lg p-3"
              type="submit"
            >
              New
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}
