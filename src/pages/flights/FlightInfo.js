import React, { useState } from "react"
import {
	Text,
	Center,
	Box,
	Card,
	CardHeader,
	CardBody,
	Heading,
	Stack,
	StackDivider,
	Flex,
	Button,
	Image,
	Spacer,
} from "@chakra-ui/react"
import AppLayout from "../../layout/AppLayout"
import { FlightStore } from "../../stores/FlightStore"
import { UserStore } from "../../stores/UserStore"
import SeatPicker from "../../components/modals/SeatPicker"
import ServicePicker from "../../components/modals/ServicePicker"
import ServiceViewer from "../../components/modals/ServiceViewer"
import { observer } from "mobx-react"

function FlightInfo({ flightNumber }) {
	const flightStore = FlightStore
	const userStore = UserStore
	const [seatPickerShown, setSeatPickerShown] = useState(false)
	const [serviceShown, setServiceShown] = useState(false)
	const [serviceViewer, setServiceViewer] = useState(false)

	const handleClickSeatPicker = () => {
		setSeatPickerShown(!seatPickerShown)
	}

	const handleClickServices = () => {
		let hasSeat = false
		let seats = flightStore.getFlight(flightNumber).seats
		for (let i = 0; i < seats.length; i++) {
			if (seats[i].user === userStore.email) {
				hasSeat = true
				setServiceShown(true)
			}
		}
		if (hasSeat === false) {
			console.log("No seat found")
		}
	}

	const handleClickViewServices = () => {
		setServiceViewer(true)
	}

	return (
		<AppLayout>
			{seatPickerShown && (
				<SeatPicker
					isOpen={seatPickerShown}
					setIsOpen={setSeatPickerShown}
					seats={flightStore.getFlight(flightNumber).seats}
					flight={flightStore.getFlight(flightNumber).flightNumber}
				/>
			)}
			{serviceShown && (
				<ServicePicker
					isOpen={serviceShown}
					setIsOpen={setServiceShown}
					flightNumber={flightNumber}
				/>
			)}
			{serviceViewer && (
				<ServiceViewer
					isOpen={serviceViewer}
					setIsOpen={setServiceViewer}
					flightNumber={flightNumber}
				/>
			)}

			<Flex justifyContent="space-between" w="80vw">
				<Flex
					flex={2}
					direction="column"
					minW="60%"
					maxW="60%"
					bg="white"
					p="2rem"
					borderRadius="6px"
					alignItems="space-between"
				>
					<Text pb="2rem" fontSize="3xl" as="b">
						Flight Details
					</Text>
					<Stack divider={<StackDivider />} spacing="4">
						<Box>
							<Text as="b" textTransform="uppercase">
								Flight Number
							</Text>
							<Text pt="2" fontSize="sm">
								{flightStore.getFlight(flightNumber).flightNumber}
							</Text>
						</Box>
						<Box>
							<Text as="b" textTransform="uppercase">
								Origin
							</Text>
							<Text pt="2" fontSize="sm">
								{flightStore.getFlight(flightNumber).origin}
							</Text>
						</Box>
						<Box>
							<Text as="b" textTransform="uppercase">
								Destination
							</Text>
							<Text pt="2" fontSize="sm">
								{flightStore.getFlight(flightNumber).destination}
							</Text>
						</Box>
						<Box>
							<Text as="b" textTransform="uppercase">
								Times
							</Text>
							<Text pt="2" fontSize="sm">
								Departure: {flightStore.getFlight(flightNumber).startDate}
								{", "}
								{flightStore.getFlight(flightNumber).startTime}
							</Text>

							<Text pt="2" fontSize="sm">
								Arrival: {flightStore.getFlight(flightNumber).endDate}
								{", "}
								{flightStore.getFlight(flightNumber).endTime}
							</Text>
						</Box>
						<Box>
							<Text as="b" textTransform="uppercase">
								Seats Left
							</Text>
							<Text pt="2" fontSize="sm">
								{flightStore.getSeatsLeftCount(
									flightStore.getFlight(flightNumber).seats
								)}
							</Text>
						</Box>

						<Flex mt="2rem" direction="row" justifyContent="space-between">
							<Button
								bgColor="#405F90"
								color="white"
								borderRadius="6px"
								onClick={() => handleClickSeatPicker()}
							>
								Choose Seats
							</Button>
							<Button
								bgColor="#405F90"
								color="white"
								borderRadius="6px"
								onClick={() => handleClickServices()}
							>
								Pick Services
							</Button>
							<Button
								bgColor="#405F90"
								color="white"
								borderRadius="6px"
								onClick={() => handleClickViewServices()}
							>
								View Services
							</Button>
						</Flex>
					</Stack>
				</Flex>
				<Spacer />
				<Flex flex={6}>
					<Image fit="cover" src="/destination.png" />
				</Flex>
			</Flex>
		</AppLayout>
	)
}
export default observer(FlightInfo)
