import React, { useState } from "react"
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
	Stack,
} from "@chakra-ui/react"
import { FlightStore } from "../../stores/FlightStore"
import { UserStore } from "../../stores/UserStore"

function ServiceViewer({ isOpen, setIsOpen, flightNumber }) {
	const flightStore = FlightStore
	const userStore = UserStore

	const [showSeatSelector, setShowSeatSelector] = useState(true)
	const [seat, setSeat] = useState("")

	const handleSeatClick = (seat) => {
		setShowSeatSelector(false)
		setSeat(seat)
	}

	const handleRemoveService = (service) => {
		console.log(service)
		flightStore.removeService(flightNumber, seat, service)
		userStore.removeService(flightNumber, seat, service)
		setIsOpen(false)
	}

	return (
		<>
			{showSeatSelector ? (
				<Modal isOpen={isOpen} isCentered>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader color="#405F90">
							Select Seat to view services
						</ModalHeader>

						<ModalBody>
							<Grid templateColumns="repeat(2, 1fr)" gap={2}>
								{userStore.getSeats(flightNumber).map((seat, key) => (
									<GridItem key={key}>
										<Button
											color="white"
											borderRadius="0.5rem"
											w="100%"
											h="10"
											bg="#405F90"
											_hover={{
												color: "brand.text",
												backgroundColor: "brand.mantle",
												transition: "ease-in-out 0.2s",
											}}
											onClick={() => handleSeatClick(seat)}
										>
											Row: {flightStore.getSeatRow(seat.id)}, Seat:{" "}
											{flightStore.getSeatName(seat.id)}
										</Button>
									</GridItem>
								))}
							</Grid>
						</ModalBody>

						<ModalFooter>
							<Button
								bg="#405F90"
								color="white"
								mr={3}
								onClick={() => setIsOpen(false)}
							>
								Close
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			) : (
				<Modal isOpen={isOpen} isCentered>
					{" "}
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>Current Services</ModalHeader>

						<ModalBody>
							<Stack>
								{userStore
									.getServices(flightNumber, seat)
									.map((service, key) => (
										<Button
											key={key}
											onClick={() => handleRemoveService(service.id)}
										>
											{service.name}
										</Button>
									))}
							</Stack>
						</ModalBody>

						<ModalFooter>
							<Button
								bg="#405F90"
								color="white"
								mr={3}
								onClick={() => setIsOpen(false)}
							>
								Close
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			)}
		</>
	)
}
export default observer(ServiceViewer)
