import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MyContext from "./components/Auth";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CameraNvr from "./pages/CameraNvr";
//import RecoverPass from "./pages/";

const App = () => {
	const [Log, setLog] = React.useState(false);

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
		{
			path: "/camera",
			element: <CameraNvr />,
		},
	]);

	return (
		<React.StrictMode>
			<MyContext.Provider value={{ Log, setLog }}>
				<RouterProvider router={router} />
			</MyContext.Provider>
		</React.StrictMode>
	);
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
