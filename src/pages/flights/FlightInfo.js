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
} from "@chakra-ui/react"
import AppLayout from "../../layout/AppLayout"
import { UserStore } from "../../stores/UserStore"
import { FlightStore } from "../../stores/FlightStore"
import { observer } from "mobx-react"

function FlightInfo({ flightNumber }) {
	return <div>Flight Info</div>
}
export default observer(FlightInfo)
