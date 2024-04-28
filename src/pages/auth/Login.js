import React, { useState, useEffect } from "react"
import { UserStore } from "../../stores/UserStore"
import { useNavigate } from "react-router-dom"
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
	Spacer,
} from "@chakra-ui/react"
import AppLayout from "../../layout/AppLayout"

function Login() {
	const navigate = useNavigate()
	const userStore = UserStore
	const [uname, setUname] = useState("")
	const [pword, setPword] = useState("")

	useEffect(() => {
		userStore.set("isLoggedIn", false)
	}, [])

	const handleLogin = () => {
		try {
			userStore.login(uname, pword)
		} catch (err) {
			console.log(err)
		}
		if (userStore.isLoggedIn) {
			userStore.set("errMsg", "")
			navigate("/")
		}
	}

	return (
		<AppLayout>
			<form>
				<Stack w="300px" bg="white" borderRadius="16px" py="2rem" px="2rem">
					<Text color="brand.text" as="b" fontSize="4xl" textAlign="center">
						FlyDream
					</Text>

					<Input
						variant="flushed"
						type="email"
						name="email"
						placeholder="Email"
						value={uname}
						onChange={(e) => setUname(e.target.value)}
					/>
					<Input
						variant="flushed"
						type="password"
						name="password"
						placeholder="Password"
						value={pword}
						onChange={(e) => setPword(e.target.value)}
					/>
					<Text color="brand.red">{userStore.errMsg}</Text>

					<Button
						color="brand.text"
						variant="outline"
						onClick={() => handleLogin()}
					>
						Login
					</Button>

					<Flex gap="0.5rem" justifyContent="center">
						<Text color="brand.text">Need an account?</Text>
						<Button
							color="brand.text"
							size="xs"
							variant="link"
							onClick={() => navigate("/my-account")}
						>
							Sign Up
						</Button>
					</Flex>
				</Stack>
			</form>
		</AppLayout>
	)
}
export default observer(Login)
