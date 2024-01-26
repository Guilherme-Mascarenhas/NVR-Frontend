import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
//import VideoPlayer from "./pages/CameraNvr/teste";

const router = createBrowserRouter([
	{
		path: "*",
		element: <ErrorPage />,
	},
	{
		path: "/",
		element: <Login />,
	},
	{
		path: "/register",
		element: <Register />,
	},
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
