import { redirect } from "react-router-dom";
import { deleteSession } from "../sessions";

export async function action({ params }) {
  await deleteSession(params);
  return redirect(`/${params.userId}/clients/${params.clientId}`);
}
