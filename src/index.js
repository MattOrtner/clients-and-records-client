import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";

import Contact, {
  loader as contactLoader,
  action as createAction,
} from "./routes/contact";

import EditContact, { action as editAction } from "./routes/edit";

import ContactList, {
  loader as contactListLoader,
  action as contactListAction,
} from "./routes/contactList";

import ErrorPage from "./routes/error-page";

import Profile, {
  loader as profileLoader,
  action as profileAction,
} from "./routes/profile";

import CreateSession, {
  action as saveSession,
  loader as sessionLoader,
} from "./routes/createSession";

import SessionPage, {
  loader as sessionPageLoader,
  action as updateSession,
} from "./routes/sessionPage";

import { action as deleteContact } from "./routes/deleteContact";
import { action as deleteSession } from "./routes/deleteSession";

import Landing from "./routes/landing"; //   action as landingPageAction, //   loader as landingPageLoader,

import Calendar from "./routes/calendar";
import Payments, { loader as paymentsLoader } from "./routes/payments";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: ":userId/clients",
        element: <ContactList />,
        action: contactListAction,
      },
      {
        path: "payments",
        element: <Payments />,
        loader: paymentsLoader,
      },
      {
        path: "calendar",
        element: <Calendar />,
      },
      {
        path: ":userId/clients/:clientId",
        element: <Contact />,
        loader: contactLoader,
        action: createAction,
      },
      {
        path: ":userId/clients/create",
        element: <EditContact />,
        // loader: contactLoader,
        action: editAction,
      },
      {
        path: "contacts/:contactId/create-session/:sessionId",
        element: <CreateSession />,
        loader: sessionLoader,
        action: saveSession,
      },
      {
        path: "contacts/:contactId/sessions/:sessionId",
        element: <SessionPage />,
        loader: sessionPageLoader,
        action: updateSession,
      },
      {
        path: "contacts/:contactId/profile",
        element: <Profile />,
        loader: profileLoader,
        action: profileAction,
      },
      {
        path: "contacts/:contactId/profile/delete",
        action: deleteContact,
      },
      {
        path: "contacts/:contactId/sessions/:sessionId/delete",
        action: deleteSession,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
