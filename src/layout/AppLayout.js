import { Center, Flex } from "@chakra-ui/react"
import React from "react"
import Header from "./Header"
import Footer from "./Footer"

export default function AppLayout({ children }) {
	return (
		<Flex h="100%" w="100%" direction="column" justifyContent="space-between">
			<Header />
			<Center h="80vh">{children}</Center>
			<Footer />
		</Flex>
	)
}
