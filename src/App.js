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
import { observer } from "mobx-react"

import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
	Navigate,
	redirect,
} from "react-router-dom"

function App() {
	const userStore = UserStore
	const flightStore = FlightStore

	// useEffect(() => {
	// 	flightStore.fillFlights()
	// }, [])

	const loader = async () => {
		if (!userStore.isLoggedIn) {
			return redirect("/login")
		}
		return null
	}

	const router = createBrowserRouter([
		{
			path: "/",
			element: <Home />,
		},
		{
			path: "/login",
			element: <Login />,
			loader: () => {
				userStore.set("errMsg", "")
				if (userStore.isLoggedIn) {
					return redirect("/my-account")
				}
				return null
			},
		},
		{
			path: "/sign-up",
			element: <SignUp />,
		},
		{
			path: "/flights",
			element: <Flights />,
			loader: loader,
		},
		{
			path: "flights/:flightNumber",
			element: <FlightInfo flightNumber={flightStore.selectedFlight} />,
			loader: loader,
		},
		{
			path: "/my-account",
			element: <MyAccount />,
		},
	])

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

export default observer(App)
