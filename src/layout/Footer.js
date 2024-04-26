import { Flex, Stack, Text, Image, Icon } from "@chakra-ui/react"
import React from "react"
import { FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa"

export default function Footer() {
	return (
		<Flex
			py="3rem"
			px="15rem"
			bg="white"
			alignContent="flex-start"
			justifyContent="space-between"
		>
			<Flex justifyContent="space-between" direction="column">
				<Flex alignItems="center" px="1rem">
					<Image boxSize="48px" src="/Logo.svg" alt="FlyDream Air Logo"></Image>
					<Text fontSize="3xl" align="center">
						FlyDream Air
					</Text>
				</Flex>
				<Flex px="1rem" justifyContent="flex-start">
					<Icon mx="1rem" boxSize="16px" color="#6E7491" as={FaTwitter} />
					<Icon mr="1rem" boxSize="16px" color="#6E7491" as={FaInstagram} />
					<Icon boxSize="16px" color="#6E7491" as={FaFacebookF} />
				</Flex>
			</Flex>
			<Stack>
				<Text color="#6E7491" as="b">
					About
				</Text>
				<Text color="#7C8DB0">About us</Text>
				<Text color="#7C8DB0">How it works</Text>
				<Text color="#7C8DB0">Careers</Text>
				<Text color="#7C8DB0">Press</Text>
				<Text color="#7C8DB0">Blog</Text>
				<Text color="#7C8DB0">Forum</Text>
			</Stack>
			<Stack>
				<Text color="#6E7491" as="b">
					Partner with us
				</Text>
				<Text color="#7C8DB0">Partnership Programs</Text>
				<Text color="#7C8DB0">Affiliate Prorgam</Text>
				<Text color="#7C8DB0">Connectivity Partners</Text>
				<Text color="#7C8DB0">Promotions and Events</Text>
				<Text color="#7C8DB0">Integrations</Text>
				<Text color="#7C8DB0">Community</Text>
				<Text color="#7C8DB0">Loyalty Program</Text>
			</Stack>
			<Stack>
				<Text color="#6E7491" as="b">
					Support
				</Text>
				<Text color="#7C8DB0">Help Center</Text>
				<Text color="#7C8DB0">Contact Us</Text>
				<Text color="#7C8DB0">Privacy Policy</Text>
				<Text color="#7C8DB0">Terms of Service</Text>
				<Text color="#7C8DB0">Trust and Safety</Text>
				<Text color="#7C8DB0">Accessibility</Text>
			</Stack>
			<Stack>
				<Text color="#6E7491" as="b">
					Get the App
				</Text>
				<Text color="#7C8DB0">FlyDream for Android</Text>
				<Text color="#7C8DB0">FlyDream for IOS</Text>
			</Stack>
		</Flex>
	)
}
