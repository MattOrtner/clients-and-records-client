import { redirect } from "react-router-dom";
import { deleteClient } from "../contacts";

export async function action({ params }) {
  await deleteClient(params.userId, params.clientId);
  return redirect("/:userId/clients");
}
