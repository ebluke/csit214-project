import React from "react"
import Header from "../layout/Header"
import Footer from "../layout/Footer"
import { Text } from "@chakra-ui/react"
import AppLayout from "../layout/AppLayout"

export default function Home() {
	return (
		<div>
			<AppLayout>
				<Text>Home</Text>
			</AppLayout>
		</div>
	)
}
