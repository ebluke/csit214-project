import { Center, Flex, ScaleFade, Box } from "@chakra-ui/react"
import React from "react"
import Header from "./Header"
import Footer from "./Footer"

export default function AppLayout({ children }) {
	return (
		<Flex w="100%" direction="column" justifyContent="space-between">
			<Header />
			<Center h="80vh" overflowY="scroll">
				<ScaleFade in={true}>
					<Center h="70vh">{children}</Center>
				</ScaleFade>
			</Center>
			<Footer />
		</Flex>
	)
}
