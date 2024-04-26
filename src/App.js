import * as React from "react"
import { ChakraProvider, Text } from "@chakra-ui/react"
import AppLayout from "./layout/AppLayout"
import Login from "./pages/auth/Login"
import Dashboard from "./pages/dashboard/Dashboard"
import SignUp from "./pages/auth/SignUp"

import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
	Navigate,
} from "react-router-dom"

const router = createBrowserRouter([
	{
		path: "/",
		element: <Navigate to="/login" />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/sign-up",
		element: <SignUp />,
	},
	{
		path: "/dashboard",
		element: <Dashboard />,
	},
])

function App() {
	return (
		<ChakraProvider>
			<AppLayout>
				<RouterProvider router={router} />
			</AppLayout>
		</ChakraProvider>
	)
}

export default App
