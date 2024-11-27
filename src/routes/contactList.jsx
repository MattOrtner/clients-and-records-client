import { useEffect, useState } from "react";
import {
  NavLink,
  useLoaderData,
  Form,
  useSubmit,
  redirect,
  useOutletContext,
} from "react-router-dom";
import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";
import { getContacts, createContact } from "../contacts";

export async function action(req) {
  return redirect(`/${req.params.userId}/clients/create`);
}

export default function ContactList() {
  const [user, setUser] = useOutletContext();

  useEffect(() => {
    const fetchClients = async () => {
      const clients = await getContacts(user.id);
      if (clients.length > 0) setUser((user) => ({ ...user, clients }));
    };
    fetchClients();
  }, []);

  console.log("user", user);

  return (
    <>
      <div className="w-full">
        <span className="flex w-full justify-end p-2">
          <Form method="post">
            <button className="bg-blue-500 text-white my-8 mx-4" type="submit">
              <Icon path={mdiPlus} size={1} />
            </button>
          </Form>
        </span>
        <nav className="w-full flex flex-col items-center  gap-4 overflow-scroll">
          {user.clients ? (
            <ul className="w-full overflow-scroll">
              {user.clients.map((client) => (
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
