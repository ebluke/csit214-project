import React, { useEffect } from "react"
import { Box } from "@chakra-ui/react"
import Login from "./pages/auth/Login"
import SignUp from "./pages/auth/SignUp"
import Flights from "./pages/flights/Flights"
import FlightInfo from "./pages/flights/FlightInfo"
import Home from "./pages/Home"
import MyAccount from "./pages/MyAccount"
import { UserStore } from "./stores/UserStore"
import { FlightStore } from "./stores/FlightStore"

import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
	Navigate,
} from "react-router-dom"

function App() {
	const userStore = UserStore
	const flightStore = FlightStore

	// useEffect(() => {
	// 	flightStore.fillFlights()
	// }, [])

	const routes = [
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
			path: "flights/:flightNumber",
			element: <FlightInfo flightNumber={flightStore.selectedFlight} />,
		},
		{
			path: "/my-account",
			element: <MyAccount />,
		},
	]

	const router = createBrowserRouter(routes)
	return (
		<Box
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
