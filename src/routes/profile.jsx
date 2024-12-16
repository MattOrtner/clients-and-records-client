import { Form, useLoaderData } from "react-router-dom";
import { getProfile, deleteContact } from "../contacts";
import { useState } from "react";
import NavBackButton from "./components/NavBackButton";
import ProfileDataRow from "./components/ProfilePage/profileDataRow";
import Icon from "@mdi/react";
import {
  mdiPhone,
  mdiEmailOutline,
  mdiEmailOffOutline,
  mdiPhoneOff,
  mdiDeleteForeverOutline,
  mdiDeleteForever,
} from "@mdi/js";

export async function loader({ params }) {
  const contact = await getProfile(params.clientId);
  return { contact };
}

export async function action({ request, params }) {}

export default function Profile() {
  const { contact } = useLoaderData();
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    first,
    last,
    email,
    phone_number,
    occurance,
    rate,
    emergencyContact,
  } = contact[0];

  return (
    <div id="contact">
      <NavBackButton />
      <div className="flex flex-col justify-center items-center gap-4 my-8">
        <NavBackButton />
        <div className="mb-4">
          {first || last ? (
            <>
              <h1>
                {first} {last}
              </h1>
            </>
          ) : (
            <i>No Name</i>
          )}
        </div>
        <div className="flex w-full  justify-center gap-6 items-center mb-2">
          {phone_number ? (
            <a href={`tel:${phone_number}`}>
              <button>
                <Icon path={mdiPhone} color="rgb(59 130 246)" size={1.4} />
              </button>
            </a>
          ) : (
            <button>
              <Icon path={mdiPhoneOff} color="gray" size={1.4} />
            </button>
          )}
          {email ? (
            <a href={`mailto:${email}`}>
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
          {isDeleting ? (
            <Form method="delete" action="delete">
              <button type="submit" className="delete-button">
                <Icon path={mdiDeleteForever} color="red" size={1.4} />
              </button>
            </Form>
          ) : (
            <button onClick={() => setIsDeleting(true)}>
              <Icon
                path={mdiDeleteForeverOutline}
                color="rgb(59 130 246)"
                size={1.4}
              />
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <ProfileDataRow label={"Phone"} data={phone_number} />
        <ProfileDataRow label={"Rate"} data={rate} />
        <ProfileDataRow label={"Occurance"} data={occurance} />
      </div>
      {emergencyContact && (
        <div className="flex flex-col gap-4">
          <h1 className="text-xl">Emergency Contact</h1>
          <div>First: {emergencyContact.first}</div>
          <div>Last: {emergencyContact.last}</div>
        </div>
      )}
    </div>
  );
}
