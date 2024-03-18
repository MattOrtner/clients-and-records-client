import Icon from "@mdi/react";
import {
  mdiAccountCircleOutline,
  mdiCheckCircleOutline,
  mdiPlusCircleOutline,
  mdiAlphaXCircleOutline,
} from "@mdi/js";
import { Form, NavLink, redirect, useLoaderData } from "react-router-dom";
import { getInfoForContactPage } from "../contacts";
import { createSession } from "../sessions";
import NavigateHomeButton from "../navigation";

export async function loader({ params }) {
  const contact = await getInfoForContactPage(params.contactId);
  return { contact };
}

export async function action({ request, params }) {
  switch (request.method) {
    case "GET": {
      return redirect(`/contacts/${params.contactId}/profile`);
    }
    case "POST": {
      const sessionId = await createSession(params.contactId);
      return redirect(
        `/contacts/${params.contactId}/create-session/${sessionId}`
      );
    }
    default: {
      throw new Response("", { status: 405 });
    }
  }
}

//
export default function Contact() {
  const { contact } = useLoaderData();

  return (
    <div id="contact">
      <div>
        <NavigateHomeButton />
        <div className="flex justify-center items-center gap-4 my-16 ml-4">
          {contact.first || contact.last ? (
            <>
              <h1>
                {contact.first} {contact.last}
              </h1>
            </>
          ) : (
            <i>No Name</i>
          )}
          <ClientProfile contactId={contact.id} />
        </div>
        <div className="flex flex-col w-full mt-4 gap-4">
          {contact.sessions.length ? (
            contact.sessions.map((session) => (
              <Session
                key={session.id}
                session={session}
                contactId={contact.id}
              />
            ))
          ) : (
            <div className="flex items-center m-auto">
              <div className="text-2xl pt-10">Schedule a session.</div>
            </div>
          )}
        </div>
        <div className="fixed bottom-9 w-[90%] flex justify-end pr-8">
          <Form method="POST">
            <button style={{ borderRadius: 50 }} type="submit">
              <Icon path={mdiPlusCircleOutline} size={1.5} />
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function ClientProfile({ contactId }) {
  return (
    <NavLink to={`/contacts/${contactId}/profile`}>
      <button
        name="client-profile"
        aria-label="client-profile"
        style={{ borderRadius: 50 }}
      >
        <Icon path={mdiAccountCircleOutline} size={1.25} />
      </button>
    </NavLink>
  );
}

function Session({ session, contactId }) {
  const sessionId = session.id;
  return (
    <NavLink
      to={`/contacts/${contactId}/sessions/${sessionId}`}
      className="flex justify-evenly items-center w-full h-12 rounded-md gap-4"
    >
      <div className="py-2 px-4 rounded-md border border-sky-300">
        <p>{session.date}</p>
      </div>
      <p>
        {session.paid ? (
          <Icon path={mdiCheckCircleOutline} size={1.25} color="green" />
        ) : (
          <Icon path={mdiAlphaXCircleOutline} size={1.25} color="red" />
        )}
      </p>
    </NavLink>
  );
}
