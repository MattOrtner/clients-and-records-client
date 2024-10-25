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

export async function loader({ request, userId }) {
  // const url = new URL(request.request.url);
  // const q = url.searchParams.get("q");
  const clients = await getContacts(userId);
  // return { clients, q };
  return { clients };
}
export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}
export default function ContactList() {
  const { clients, q } = useLoaderData();
  const [apiClients, setApiContacts] = useState(clients || []);

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
          {apiClients.length ? (
            <ul className="w-full">
              {apiClients.map((client) => (
                <li key={client.id}>
                  <NavLink
                    to={`${client.id}`}
                    className="flex justify-center items-center w-full rounded-lg"
                  >
                    {client.first || client.last ? (
                      <div className="text-xl w-[90%] text-center border-gray-200 border-2 rounded-lg py-1 mb-2">
                        {client.first} {client.last}
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
