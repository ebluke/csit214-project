import { Box, Center, Flex } from "@chakra-ui/react"
import React from "react"

export default function AppLayout({ children }) {
	return (
		<Box
			minH="100vh"
			zIndex="-999999"
			bgImage="url('/background.png')"
			backgroundPosition="center"
			backgroundRepeat="no-repeat"
			backgroundSize="cover"
		>
			<Box>{children}</Box>
		</Box>
	)
}
