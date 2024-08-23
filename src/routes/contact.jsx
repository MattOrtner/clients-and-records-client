import Icon from "@mdi/react";
import {
  mdiAccountCircleOutline,
  mdiPlus,
  mdiPhone,
  mdiPhoneOff,
  mdiEmailOutline,
  mdiEmailOffOutline,
} from "@mdi/js";

import Session from "./components/ContactPage/session";
import { Form, NavLink, redirect, useLoaderData } from "react-router-dom";
import { getContact } from "../contacts";
import { createSession } from "../sessions";
import NavBackButton from "./components/NavBackButton";

export async function loader({ params }) {
  const contact = await getContact(params.contactId);
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

export default function Contact() {
  const { contact } = useLoaderData();

  return (
    <div id="contact">
      <div className="flex flex-col justify-center items-center gap-4 my-8">
        <NavBackButton />
        <div className="mb-4">
          {contact.first || contact.last ? (
            <>
              <h1>
                {contact.first} {contact.last}
              </h1>
            </>
          ) : (
            <i>No Name</i>
          )}
        </div>
        <div className="flex w-full  justify-center gap-6 items-center mb-2">
          {contact.phonenumber ? (
            <a href={`tel:${contact.phonenumber}`}>
              <button>
                <Icon path={mdiPhone} color="rgb(59 130 246)" size={1.4} />
              </button>
            </a>
          ) : (
            <button>
              <Icon path={mdiPhoneOff} color="gray" size={1.4} />
            </button>
          )}
          {contact.email ? (
            <a href={`mailto:${contact.email}`}>
              <button>
                <Icon
                  path={mdiEmailOutline}
                  color="rgb(59 130 246)"
                  size={1.4}
                />
              </button>
            </a>
          ) : (
            <button>
              <Icon path={mdiEmailOffOutline} color="gray" size={1.4} />
            </button>
          )}
          <ConcactProfileNavLink contactId={contact.id} size={1.4} />
        </div>
      </div>
      <div className="flex flex-col items-center w-full h-[560px] gap-4 overflow-scroll">
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
      <Form method="POST">
        <button className="fixed bottom-24 right-4 rounded-full" type="submit">
          <Icon path={mdiPlus} color="rgb(59 130 246)" size={2} />
        </button>
      </Form>
    </div>
  );
}

function ConcactProfileNavLink({ contactId, size }) {
  return (
    <NavLink to={`/contacts/${contactId}/profile`}>
      <button
        name="client-profile"
        aria-label="client-profile"
        className="flex justify-center items-center"
      >
        <Icon
          path={mdiAccountCircleOutline}
          color="rgb(59 130 246)"
          size={size}
        />
      </button>
    </NavLink>
  );
}
