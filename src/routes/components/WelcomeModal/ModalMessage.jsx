import CloseButton from "../LandingPage/CloseButton";

const ModalMessage = ({ handleModal }) => {
  const isMobile = (
    <div className="w-full flex justify-end rounded-md mt-4">
      <CloseButton handleModal={handleModal} />
    </div>
  );
  return (
    <div className=" bg-gray-100 max-w-[500px] p-4 rounded-md shadow-md max-h-screen overflow-y-auto pb-16">
      <div className="w-full flex justify-end rounded-md">
        <CloseButton handleModal={handleModal} />
      </div>
      <div className="text-gray-700 font-sans">
        <span className="text-2xl font-bold mb-2">Clients & Records App</span>
        <p className="text-lg font-bold mb-2">Here's the story...</p>
        <p className="mb-2">
          <b>TLDR: </b> Therapist friend wanted an app that could do it all on
          her phone!
        </p>
        <p className="mb-2">
          RIGHT NOW she can CRUD her clients, create therapy sessions for those
          clients, and manage if they paid for that specific therapy session or
          not. With a few other bells and whistles.
        </p>
        <p className="mb-2">
          This is a work in progress, but hey,{" "}
          <b className="text-lg">she's using it!</b>
        </p>
        <p className="mb-8">
          <b>Built using:</b> React, React Router, TailwindCSS, Express,
          PostgresDB, GitHub Actions, and Vercel.
        </p>
        <p className="mb-2">
          <b>How to:</b> copy/paste the email placeholder into the password
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
      {window.innerWidth < 400 && isMobile}
    </div>
  );
};
export default ModalMessage;
