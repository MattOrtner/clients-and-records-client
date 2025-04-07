const ModalMessage = () => {
  return (
    <div className=" bg-gray-100 p-4 rounded-md shadow-md">
      <p className="text-sm text-gray-700">
        <span className="text-2xl font-bold">Clients & Records App</span>
        <br /> <br />
        Here's the story...
        <br /> <br />
        I had a therapist friend that wanted to seperate her client info off her
        phone. Remove them from her contacts, and get all of their jumbled notes
        out of her Default phone app. So I got to work!
        <br /> <br />
        At the moment allows you to CRUD new clients, individual sessions with
        their notes, and track payments. This is a work in progress but hey,
        she's using it!
        <br /> <br />
        Very exciting!
        <br /> <br />
        This application is built using modern web technologies, including React
        for the user interface, React Router for navigation, Express for Routing
        and PostgresDB for storage.
        <br /> <br />
        To get started, please log in using the guest email already in the form
        feild. The password is actually just a copy of the email itself... Very
        sneaky, I know.
        <br /> <br />
      </p>
      Please reach out here:
      <br />
      <a className="underline" href="http://www.linkedin.com/in/matthewortner">
        Matthew's LinkedIn
      </a>
    </div>
  );
};
export default ModalMessage;
