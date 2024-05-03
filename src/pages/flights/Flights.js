import React, { useEffect, useState } from "react"
import AppLayout from "../../layout/AppLayout"
import {
	Flex,
	Text,
	TableContainer,
	Table,
	TableCaption,
	Thead,
	Tr,
	Th,
	Td,
	Tbody,
	Tfoot,
	Box,
	RadioGroup,
	Radio,
	Stack,
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { FlightStore } from "../../stores/FlightStore"
import flightData from "../../database/flightData"
import { UserStore } from "../../stores/UserStore"

function Flights() {
	const flightStore = FlightStore
	const userStore = UserStore
	const flightUrl = "/flights/"
	const navigate = useNavigate()
	const [value, setValue] = useState("1")

	const handleClick = (flightnum) => {
		flightStore.set("selectedFlight", flightnum)
		navigate(`${flightUrl}${flightnum}`)
	}

	return (
		<AppLayout>
			<Stack>
				<Flex
					pl="2rem"
					bg="white"
					borderRadius="6px"
					direction="row"
					py="1rem"
					w="80vw"
					justifyContent="flex-start"
				>
					<RadioGroup colorScheme="orange" onChange={setValue} value={value}>
						<Radio pr="2rem" value="1" size="lg">
							Future Flights
						</Radio>

						<Radio value="2" size="lg">
							My Flights
						</Radio>
					</RadioGroup>
				</Flex>
				{value == 1 ? (
					<Box bg="white" maxH="100%" overflowY="scroll" h="70vh">
						<Table variant="simple">
							<Thead>
								<Tr>
									<Th>Flight Name</Th>
									<Th>From</Th>
									<Th>To </Th>
									<Th>Start Date </Th>
									<Th>Start Time </Th>
									<Th>End Date </Th>
									<Th>End Time </Th>
									<Th>Seats Left</Th>
								</Tr>
							</Thead>
							<Tbody>
								{flightData.map((flight, key) => (
									<Tr
										onClick={() => handleClick(flight.flightNumber)}
										key={key}
									>
										<Td>{flight.flightNumber}</Td>
										<Td>{flight.origin}</Td>
										<Td>{flight.destination}</Td>
										<Td>{flight.startDate}</Td>
										<Td>{flight.startTime}</Td>
										<Td>{flight.endDate}</Td>
										<Td>{flight.endTime}</Td>
										<Td>{flightStore.getSeatsLeftCount(flight.seats)}</Td>
									</Tr>
								))}
							</Tbody>
						</Table>
					</Box>
				) : (
					<Box bg="white" maxH="100%" overflowY="scroll" h="70vh">
						<Table variant="simple">
							<Thead>
								<Tr>
									<Th>Flight Name</Th>
									<Th>From</Th>
									<Th>To </Th>
									<Th>Start Date </Th>
									<Th>Start Time </Th>
									<Th>End Date </Th>
									<Th>End Time </Th>
									<Th>Seats Selected</Th>
								</Tr>
							</Thead>
							<Tbody>
								{userStore
									.getUserData(userStore.email)
									.flights.map((flight, key) => (
										<Tr
											onClick={() => handleClick(flight.flightNumber)}
											key={key}
										>
											<Td>{flight.flightNumber}</Td>
											<Td>{flight.origin}</Td>
											<Td>{flight.destination}</Td>
											<Td>{flight.startDate}</Td>
											<Td>{flight.startTime}</Td>
											<Td>{flight.endDate}</Td>
											<Td>{flight.endTime}</Td>
											<Td>{flight.seats.length}</Td>
										</Tr>
									))}
							</Tbody>
						</Table>
					</Box>
				)}
			</Stack>
		</AppLayout>
	)
}
export default Flights
