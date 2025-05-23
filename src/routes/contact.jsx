import Icon from "@mdi/react";
import {
  mdiPlus,
  mdiPhone,
  mdiPhoneOff,
  mdiEmailOutline,
  mdiEmailOffOutline,
} from "@mdi/js";

import Session from "./components/ContactPage/session";
import {
  Form,
  redirect,
  useLoaderData,
  useOutletContext,
} from "react-router-dom";
import { getContact } from "../contacts";
import { getClientSessions } from "../sessions";

import NavBackButton from "./components/NavBackButton";
import ClientProfileNavButton from "./components/ContactPage/clientProfileNavButton";
import ClientsName from "./components/ClientsName";

export async function loader({ params }) {
  try {
    const clientData = await getContact(params.clientId);
    const clientSessions = await getClientSessions(params);
    return { clientData, clientSessions };
  } catch (e) {
    console.error("error loader", e);
  }
}

export async function action({ request, params }) {
  switch (request.method) {
    case "GET": {
      return redirect(`/${params.userId}/clients/${params.clientId}/profile`);
    }
    case "POST": {
      return redirect(
        `/${params.userId}/clients/${params.clientId}/create-session`
      );
    }
    default: {
      throw new Response("", { status: 405 });
    }
  }
}

export default function Contact() {
  const { clientData, clientSessions } = useLoaderData();

  const client = clientData.length ? clientData[0] : {};
  const sessions = clientSessions.length > 0 ? clientSessions : [];
  const [user, _] = useOutletContext();

  return (
    <div id="contact">
      <div className="flex flex-col justify-center items-center gap-4 my-8">
        <NavBackButton route={`/${user.id}/clients`} />
        <ClientsName first={client.first} last={client.last} />
        <div className="flex w-full justify-center gap-6 items-center mb-2">
          {client.phone_number ? (
            <a href={`tel:${client.phone_number}`}>
              <button>
                <Icon path={mdiPhone} color="rgb(59 130 246)" size={1.4} />
              </button>
            </a>
          ) : (
            <button>
              <Icon path={mdiPhoneOff} color="gray" size={1.4} />
            </button>
          )}
          {client.email ? (
            <a href={`mailto:${client.email}`}>
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
          <ClientProfileNavButton userId={user.id} clientId={client.id} />
        </div>
      </div>
      <div className="flex flex-col items-center h-full gap-4 overflow-scroll">
        {sessions.length ? (
          sessions.map((session) => (
            <Session key={session.id} session={session} contactId={client.id} />
          ))
        ) : (
          <div className="flex items-center m-auto">
            <div className="text-2xl pt-10">Schedule a session below</div>
          </div>
        )}
      </div>
      <Form method="POST">
        <button
          className="fixed bottom-24 right-4 sm:right-24 rounded-full"
          type="submit"
        >
          <Icon path={mdiPlus} color="rgb(59 130 246)" size={2} />
        </button>
      </Form>
    </div>
  );
}
