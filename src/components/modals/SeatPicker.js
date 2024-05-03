import React from "react"
import { observer } from "mobx-react"
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	Button,
	Grid,
	GridItem,
	Box,
	Flex,
	Text,
	Center,
} from "@chakra-ui/react"
import { FlightStore } from "../../stores/FlightStore"
import { UserStore } from "../../stores/UserStore"
import flightData from "../../database/flightData"
import userData from "../../database/userData"

function SeatPicker({ isOpen, setIsOpen, seats, flight }) {
	const flightStore = FlightStore
	const userStore = UserStore

	const handleItemClick = (seat) => {
		let flightNumber = flightStore.getFlight(flight).flightNumber
		let origin = flightStore.getFlight(flight).origin
		let destination = flightStore.getFlight(flight).destination
		let startDate = flightStore.getFlight(flight).startDate
		let startTime = flightStore.getFlight(flight).startTime
		let endDate = flightStore.getFlight(flight).endDate
		let endTime = flightStore.getFlight(flight).endTime

		if (seat.user == userStore.email) {
			userStore.removeFlight(seat, flightNumber)
			flightStore.removeUser(flightNumber, seat)
		} else {
			userStore.addFlight(
				flightNumber,
				origin,
				destination,
				startDate,
				startTime,
				endDate,
				endTime,
				seat
			)
			flightStore.addUser(flightNumber, seat, userStore.email)
		}

		setIsOpen(false)
	}
	const arrayBuilder = (seats) => {
		let counter = 0
		let newArr = []
		for (let i = 0; i < seats.length; i++) {
			if (i == 6 * counter + 3) {
				const newSeat = { id: counter, user: "NAS", services: [] }
				console.log(newSeat)
				console.log(seats[i])
				newArr.push(newSeat)
				newArr.push(seats[i])
				counter++
			} else {
				newArr.push(seats[i])
			}
		}
		return newArr
	}

	return (
		<Modal isOpen={isOpen} isCentered>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader color="#405F90">Select Seat(s)</ModalHeader>

				<ModalBody>
					<Center pb="1rem">
						<Text color="#405F90">Front of Plane</Text>
					</Center>
					<Grid templateColumns="repeat(7, 1fr)" gap={2}>
						{arrayBuilder(seats).map((seat, key) => (
							<GridItem alignContent="center" key={key}>
								{seat.user == "NAS" ? (
									<Center>
										<Text color="#405F90">{seat.id}</Text>
									</Center>
								) : (
									<Button
										isDisabled={
											seat.user == userStore.email
												? false
												: seat.user == null
												? false
												: true
										}
										color="white"
										borderRadius="0.5rem"
										w="100%"
										h="10"
										bg={seat.user == null ? "#E9E8FC" : "#001B3E"}
										_hover={{
											color: "brand.text",
											backgroundColor: "brand.mantle",
											transition: "ease-in-out 0.2s",
										}}
										onClick={() => handleItemClick(seat)}
									>
										{flightStore.getSeatName(seat.id)}
									</Button>
								)}
							</GridItem>
						))}
					</Grid>
				</ModalBody>

				<ModalFooter>
					<Button
						color="white"
						bgColor="#405F90"
						mr={3}
						onClick={() => setIsOpen(false)}
					>
						Close
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}
export default observer(SeatPicker)
