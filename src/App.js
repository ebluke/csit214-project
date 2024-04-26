import * as React from "react"
import { ChakraProvider, Box } from "@chakra-ui/react"
import AppLayout from "./layout/AppLayout"

import Login from "./pages/auth/Login"
import SignUp from "./pages/auth/SignUp"
import Flights from "./pages/Flights"
import Home from "./pages/Home"
import MyAccount from "./pages/MyAccount"

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
		element: <Home />,
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
		path: "/flights",
		element: <Flights />,
	},
	{
		path: "/my-account",
		element: <MyAccount />,
	},
])

function App() {
	return (
		<Box
			minH="100vh"
			zIndex="-999999"
			bgImage="url('/background.png')"
			backgroundPosition="center"
			backgroundRepeat="no-repeat"
			backgroundSize="cover"
		>
			<RouterProvider router={router} />
		</Box>
	)
}

export default App
