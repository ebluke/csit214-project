import React, { useState } from "react"
import { observer } from "mobx-react"
import AppLayout from "../../layout/AppLayout"
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
import { UserStore } from "../../stores/UserStore"
import FInput from "../../components/FInput"

function SignUp() {
	const navigate = useNavigate()
	const userStore = UserStore
	const [emsg, setEmsg] = useState("")

	const handleSubmit = () => {
		setEmsg("")
		if (userStore.createAccount()) {
			navigate("/login")
		} else {
			setEmsg(userStore.errMsg)
			console.log("signup error caught")
		}
	}

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
					Sign Up
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
					placeholder="Password"
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
					type="text"
					id="user-mobilenumber"
					name="mobileNumber"
					placeholder="Mobile Number"
					value={userStore.mobileNumber}
					onChange={(e) => userStore.set(e.target.name, e.target.value)}
				/>
				<Text color="red">{emsg}</Text>
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
export default observer(SignUp)
