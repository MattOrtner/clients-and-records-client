const ModalMessage = ({ handleModal }) => {
  return (
    <div className=" bg-gray-100  max-w-[500px] p-4 rounded-md shadow-md max-h-screen overflow-y-auto">
      <div className="w-full flex  justify-end rounded-md">
        <button
          type="button"
          onClick={handleModal}
          className="rounded-md bg-[#e9a843] p-2 inline-flex items-center justify-center text-white hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
        >
          <span className="sr-only">Close menu</span>
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="text-gray-700 font-sans">
        <span className="text-2xl font-bold mb-2">Clients & Records App</span>
        <p className="text-lg font-bold mb-2">Here's the story...</p>
        <p className="mb-2">
          I have a therapist friend that wanted to seperate her work life from
          her phone. Remove clients from her contacts, remove all the jumbled
          notes out of her default phone app, and get organized. So I got to
          work!
        </p>
        <p className="mb-2">
          The user can create, read, update, and delete new clients, as well as
          therapy session info (keeping all their notes and info organized
          together). Additionally, users can track payments. This is a work in
          progress, but hey, <b className="text-lg">she's using it!</b>
        </p>
        <p className="mb-2">
          This application is built using modern web technologies:{" "}
          <b> React, React Router, TailwindCSS, Express and PostgresDB.</b> The
          Client App, Express REST API, and PostgresDB are all hosted on Vercel.
          Both the Client App and Express API are being pushed to GITHUB, but
          only the client app has CI/CD through Vercel. I update the API using
          Vercels CLI, mostly for the experience.
        </p>
        <p className="mb-2">
          To get started, type the guest placeholder email into the password
          field. Very very sneaky.
        </p>
        <b>FOR BEST RESULTS PLEASE VIEW THROUGH MOBILE VIEW</b>
        <p className="text-center">~~ Now you can close this Modal ~~</p>
      </div>
      <p className="text-center">
        Reach out here:{" "}
        <a
          className="underline text-blue-500"
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.linkedin.com/in/matthewortner"
        >
          Matthew's LinkedIn
        </a>
      </p>
    </div>
  );
};
export default ModalMessage;
