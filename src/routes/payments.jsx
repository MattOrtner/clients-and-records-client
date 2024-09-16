import { useLoaderData } from "react-router-dom";
import { getUnpaidSessions } from "../sessions";

export async function loader() {
  const sessions = await getUnpaidSessions();
  return { sessions };
}
const Payments = () => {
  const { sessions } = useLoaderData();
  console.log("sessions: ", sessions);
  return (
    <div className="flex justify-center items-center h-full w-full">
      Soon to be Payments!
    </div>
  );
};
export default Payments;
