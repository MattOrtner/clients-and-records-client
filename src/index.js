import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";

import Contact, {
  loader as contactLoader,
  action as createAction,
} from "./routes/contact";

import EditContact, { action as editAction } from "./routes/edit";

import ErrorPage from "./routes/error-page";

import Profile, {
  loader as profileLoader,
  action as profileAction,
} from "./routes/profile";

import SessionPage, { loader as sessionPageLoader } from "./routes/sessionPage";

import { action as deleteContact } from "./routes/deleteContact";
import { action as deleteSession } from "./routes/deleteSession";

import CreateSession, {
  action as saveSession,
  loader as sessionLoader,
} from "./routes/createSession";

import Login from "./routes/login";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
  },

  {
    path: "contacts/:contactId",
    element: <Contact />,
    loader: contactLoader,
    action: createAction,
  },
  {
    path: "contacts/:contactId/edit",
    element: <EditContact />,
    loader: contactLoader,
    action: editAction,
  },
  {
    path: "contacts/:contactId/create-session",
    element: <CreateSession />,
    loader: sessionLoader,
    action: saveSession,
  },
  {
    path: "contacts/:contactId/sessions/:sessionId",
    element: <SessionPage />,
    loader: sessionPageLoader,
    // action: deleteSession,
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
    // create a error boundary route for all routes that do not match
    // path: "*",
    // element: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
