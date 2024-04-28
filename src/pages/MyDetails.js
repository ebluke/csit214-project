import React from "react"
import { observer } from "mobx-react"
import {
	Center,
	Text,
	Flex,
	Stack,
	Spinner,
	ScaleFade,
	Input,
	Button,
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
} from "@chakra-ui/react"
import {
	createBrowserRouter,
	RouterProvider,
	Route,
	Link,
	useNavigate,
} from "react-router-dom"
import { UserStore } from "../stores/UserStore"
import FInput from "../components/FInput"
import AppLayout from "../layout/AppLayout"

function MyAccount() {
	const navigate = useNavigate()
	const userStore = UserStore

	const handleSubmit = () => {
		try {
			userStore.createAccount()
		} catch (err) {
			console.log(err)
		}
		navigate("/login")
	}
	// option is to put AppLayout here and in SignUp and remove it from MyAccount
	return (
		<>
			<Stack
				w="300px"
				bg="white"
				borderRadius="16px"
				py="2rem"
				px="2rem"
				spacing="6"
			>
				<Text as="b" fontSize="4xl" textAlign="center">
					My Details
				</Text>
				<FInput
					isRequired
					variant="flushed"
					id="user-email"
					type="email"
					name="email"
					placeholder="Email"
					value={userStore.email}
					onChange={(e) => userStore.set(e.target.name, e.target.value)}
				/>

				<FInput
					isRequired
					variant="flushed"
					id="user-password"
					type="password"
					name="password"
					placeholder="imagine option to change password"
					value={userStore.password}
					onChange={(e) => userStore.set(e.target.name, e.target.value)}
				/>
				<FInput
					isRequired
					variant="flushed"
					id="user-fullname"
					type="text"
					name="fullName"
					placeholder="Full Name"
					value={userStore.fullName}
					onChange={(e) => userStore.set(e.target.name, e.target.value)}
				/>
				<FInput
					isRequired
					variant="flushed"
					type="number"
					id="user-mobilenumber"
					name="mobileNum"
					placeholder="Mobile Number"
					value={userStore.mobileNum}
					onChange={(e) => userStore.set(e.target.name, e.target.value)}
				/>
				<Flex justifyContent="space-between">
					<Button
						w="100%"
						borderRadius="100px"
						color="white"
						bgColor="#405F90"
						variant="solid"
						ml="1rem"
						py="1.5rem"
						onClick={() => handleSubmit()}
					>
						Submit
					</Button>
				</Flex>
			</Stack>
		</>
	)
}
export default observer(MyAccount)
