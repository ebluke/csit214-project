import React from "react"
import { UserStore } from "../stores/UserStore"
import MyDetails from "./MyDetails"
import SignUp from "./auth/SignUp"
import AppLayout from "../layout/AppLayout"

export default function MyAccount() {
	const userStore = UserStore
	return (
		<AppLayout>{userStore.isLoggedIn ? <MyDetails /> : <SignUp />}</AppLayout>
	)
}
