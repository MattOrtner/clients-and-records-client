const ModalMessage = ({ handleModal }) => {
  return (
    <div className=" bg-gray-100 p-4 rounded-md shadow-md">
      <div className="w-full flex  justify-end rounded-md">
        <button
          type="button"
          onClick={handleModal}
          className="rounded-md bg-[#e9a843] p-2 inline-flex items-center justify-center text-white hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
        >
          <span class="sr-only">Close menu</span>
          <svg
            class="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <p className="text-sm text-gray-700 font-sans">
        <span className="text-2xl font-bold">Clients & Records App</span>
        <br /> <br />
        <span className="text-lg font-bold">Here's the story...</span>
        <br /> <br />
        I had a therapist friend that wanted to seperate her client info off her
        phone. Remove them from her contacts, and get all of their jumbled notes
        out of her Default phone app. So I got to work!
        <br /> <br />
        The user can CRUD new clients, schedule individual sessions (while
        keeping their notes and info all together) , and track payments. This is
        a work in progress but hey, <b className="text-lg">she's using it!</b>
        <br /> <br />
        <span className="text-xl">Very exciting!</span>
        <br /> <br />
        This application is built using modern web technologies: React, React
        Router, TailwindCSS, Express and PostgresDB. The Client App, Express
        REST API, and PostgresDB are all hosted on Vercel. Both the Client App
        and Express API are being pushed to GITHUB, but only the client is
        connected throught Vercel for CI/CD. Mainly so I can mess around with
        Vercels CLI.
        <br /> <br />
        To get started, please log in using the guest email already in the form
        feild. The <b>password</b> is just a copy of the full email... very very
        sneaky.
        <br /> <br />
        I've only created with mobile in mind, so please use a mobile device to
        view this app. I would love to hear your feedback, and any suggestions
        you have for improvement.
        <br /> <br />
      </p>
      Please reach out here:{" "}
      <a
        className="underline text-blue-500"
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.linkedin.com/in/matthewortner"
      >
        Matthew's LinkedIn
      </a>
    </div>
  );
};
export default ModalMessage;
