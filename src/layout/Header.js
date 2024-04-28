import {
	Box,
	Center,
	Flex,
	Stack,
	Image,
	Text,
	Icon,
	Button,
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import React from "react"
import { IoMdSearch } from "react-icons/io"

export default function Header() {
	const navigate = useNavigate()
	return (
		<Center bg="white" w="100%" px="15rem" pt="1rem" h="100px">
			<Stack w="100%" h="100%">
				<Flex justifyContent="space-between" alignItems="center" w="100%">
					<Flex alignItems="center" px="1rem">
						<Image
							boxSize="48px"
							src="/Logo.svg"
							alt="FlyDream Air Logo"
						></Image>
						<Text fontSize="3xl" align="center">
							FlyDream Air
						</Text>
					</Flex>
					<Flex alignItems="center">
						<Icon boxSize="24px" as={IoMdSearch} />
						<Button
							borderRadius="100px"
							color="white"
							bgColor="#405F90"
							variant="solid"
							ml="1rem"
							py="1.5rem"
							px="1.5rem"
							onClick={() => navigate("/login")}
						>
							Log in
						</Button>
					</Flex>
				</Flex>
				<Flex justifyContent="space-evenly">
					{/* These could be tabs, although I think buttons will simpify the navigation with react-router */}
					<Button
						colorScheme="teal"
						variant="ghost"
						onClick={() => navigate("/")}
					>
						Home
					</Button>
					<Button
						colorScheme="teal"
						variant="ghost"
						onClick={() => navigate("/flights")}
					>
						Flights
					</Button>
					<Button
						colorScheme="teal"
						variant="ghost"
						onClick={() => navigate("/my-account")}
					>
						My Account
					</Button>
				</Flex>
			</Stack>
		</Center>
	)
}
