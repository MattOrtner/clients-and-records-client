import { useEffect } from "react";
import {
  NavLink,
  Form,
  redirect,
  useOutletContext,
  useLoaderData,
} from "react-router-dom";
import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";
import { getContacts } from "../contacts";
import CurrentDay from "../currentDay";

export async function action(req) {
  return redirect(`/${req.params.userId}/clients/create`);
}
export async function loader({ params }) {
  const clients = await getContacts(params.userId);
  return clients;
}

export default function ContactList() {
  const [user, _] = useOutletContext();
  const clients = useLoaderData();

  return (
    <div className="w-full sm:w-1/2">
      <h1 className="text-4xl text-gray-800 font-serif p-8">
        Happy {CurrentDay} {user.first}!
      </h1>
      <div className="flex w-full justify-end">
        <Form method="post">
          <button className=" text-white my-4 mx-4 rounded-full" type="submit">
            <Icon path={mdiPlus} color="rgb(59 130 246)" size={1.5} />
          </button>
        </Form>
      </div>
      <nav className="w-full flex flex-col items-center">
        {clients.length > 0 ? (
          <ul className="w-full p-2 flex flex-col gap-1 items-center overflow-scroll no-scrollbar">
            {clients.map((client) => (
              <NavLink
                key={client.id}
                to={`/${user.id}/clients/${client.id}`}
                className="flex justify-center items-center w-full border-gray-300 border rounded-lg py-2"
              >
                {client.first || client.last ? (
                  <div className="text-xl w-[90%] text-center">
                    {client.first} {client.last}
                  </div>
                ) : (
                  <i>No Name</i>
                )}
              </NavLink>
            ))}
          </ul>
        ) : (
          <p className="text-2xl mt-28">Add a contact</p>
        )}
      </nav>
    </div>
  );
}
