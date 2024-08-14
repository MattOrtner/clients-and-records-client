import Icon from "@mdi/react";
import {
  mdiAccountCircleOutline,
  mdiCheckCircleOutline,
  mdiPlusCircleOutline,
  mdiAlphaXCircleOutline,
  mdiEmoticonFrownOutline,
  mdiAccountMultipleOutline,
  mdiPhone,
  mdiPhoneOff,
  mdiEmailOutline,
  mdiEmailOffOutline,
} from "@mdi/js";

import { Form, NavLink, redirect, useLoaderData } from "react-router-dom";
import { getContact } from "../contacts";
import { createSession } from "../sessions";

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
        <div className="flex w-full  justify-center gap-6 items-center mb-4">
          {contact.phoneNumber ? (
            <a href={`tel:${contact.phoneNumber}`}>
              <button>
                <Icon path={mdiPhone} color="gray" size={1.4} />
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
                <Icon path={mdiEmailOutline} color="gray" size={1.4} />
              </button>
            </a>
          ) : (
            <button>
              <Icon path={mdiEmailOffOutline} color="gray" size={1.4} />
            </button>
          )}
          <ClientProfileNavLink contactId={contact.id} size={1.4} />
        </div>
      </div>
      <div className="flex flex-col items-center w-full mt-4 gap-4">
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
        <button
          className="fixed bottom-24 right-4  bg-blue-200 rounded-full"
          type="submit"
        >
          <Icon path={mdiPlusCircleOutline} color="black" size={2} />
        </button>
      </Form>
    </div>
  );
}

function ClientProfileNavLink({ contactId, size }) {
  return (
    <NavLink to={`/contacts/${contactId}/profile`}>
      <button
        name="client-profile"
        aria-label="client-profile"
        className="flex justify-center items-center"
      >
        <Icon path={mdiAccountCircleOutline} color="gray" size={size} />
      </button>
    </NavLink>
  );
}

function reverseDate(date) {
  if (date) {
    const year = date.slice(0, 4);
    const monthDay = date.slice(5);
    return `${monthDay}-${year}`;
  }
}

function Session({ session, contactId }) {
  const reversedDate = reverseDate(session.date);

  const sessionId = session.id;
  return (
    <NavLink
      to={`/contacts/${contactId}/sessions/${sessionId}`}
      className="flex justify-evenly items-center w-[90%]
      h-12 rounded-md border border-gray-300 gap-4 font-verdana"
    >
      <div className="py-2 px-4 rounded-md">
        <p>{reversedDate}</p>
      </div>
      <p>
        {session.paid ? (
          <Icon path={mdiCheckCircleOutline} size={1.25} color="green" />
        ) : (
          <Icon path={mdiEmoticonFrownOutline} size={1.25} color="red" />
        )}
      </p>
    </NavLink>
  );
}
