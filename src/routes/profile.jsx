import { useState } from "react";
import { Form, useLoaderData, useSubmit } from "react-router-dom";
import { getProfile } from "../contacts";
import { updateClient } from "../contacts";
import NavBackButton from "./components/NavBackButton";
import ClientsName from "./components/ClientsName";
import ProfileDataRow from "./components/ProfilePage/profileDataRow";

import Icon from "@mdi/react";
import { mdiDeleteForeverOutline, mdiDeleteForever } from "@mdi/js";

export async function loader({ params }) {
  const contact = await getProfile(params.clientId);
  return { contact };
}

export async function action({ request, params }) {
  const { userId, clientId } = params;
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateClient(userId, clientId, updates);
  return null;
}

export default function Profile() {
  const submit = useSubmit();
  const { contact } = useLoaderData();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [clientData, setClientData] = useState({
    first: contact[0].first,
    last: contact[0].last,
    email: contact[0].email,
    phone_number: contact[0].phone_number,
    rate: contact[0].rate,
  });
  const [changes, setChanges] = useState([]);
  const handleIsEditing = () => {
    setIsEditing(true);
  };

  const createChangeObject = () => {
    const changeObject = {};
    changes.forEach((change) => {
      changeObject[change] = clientData[change];
    });
    return changeObject;
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setIsDeleting(false);
    const changes = createChangeObject();
    submit(changes, { method: "post" });
    setChanges([]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (!changes.includes(name)) {
      setChanges((prev) => [...prev, name]);
    }
    setClientData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div id="contact">
      <div className="mx-auto my-8">
        <NavBackButton />
        <div className="flex w-full justify-center">
          <ClientsName first={clientData.first} last={clientData.last} />
          <div className="absolute top-10 right-8">
            {isEditing ? (
              <button
                onClick={handleSave}
                type="submit"
                className="text-blue-500 font-semibold"
              >
                Save
              </button>
            ) : (
              <div className="flex flex-end">
                <button
                  onClick={handleIsEditing}
                  className=" text-blue-500 font-semibold"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Form
        method="post"
        action="update"
        className="flex flex-col items-center gap-4 align-center"
      >
        <ProfileDataRow
          label={"Phone"}
          data={clientData.phone_number}
          name="phone_number"
          type="number"
          isEditing={isEditing}
          onChange={handleChange}
        />
        <ProfileDataRow
          label={"Email"}
          data={clientData.email}
          name="email"
          type="email"
          isEditing={isEditing}
          onChange={handleChange}
        />
        <ProfileDataRow
          label={"Rate"}
          data={clientData.rate}
          name="rate"
          isEditing={isEditing}
          onChange={handleChange}
        />
      </Form>
      {isEditing ? (
        isDeleting ? (
          <Form method="delete" action="delete">
            <button type="submit" className="delete-button">
              <Icon
                path={mdiDeleteForever}
                color="red"
                style={{ height: "100px", backgroundColor: "red" }}
              />
            </button>
          </Form>
        ) : (
          <button
            onClick={() => setIsDeleting(true)}
            className="w-full content-center flex justify-center items-center rounded-full p-2 text-red-500 font-semibold"
          >
            <Icon
              path={mdiDeleteForeverOutline}
              color="rgb(59 130 246)"
              size={1.4}
            />
          </button>
        )
      ) : (
        ""
      )}
      {clientData.emergencyContact && (
        <div className="flex flex-col gap-4">
          <h1 className="text-xl">Emergency Contact</h1>
          <div>First: {clientData.emergencyContact.first}</div>
          <div>Last: {clientData.emergencyContact.last}</div>
        </div>
      )}
    </div>
  );
}
