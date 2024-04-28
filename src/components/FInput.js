import React from "react"
import { observer } from "mobx-react"
import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Input,
	Stack,
	InputGroup,
} from "@chakra-ui/react"

function FInput({ name, type, placeholder, onChange, value, id, ...props }) {
	const isError = value === ""
	return (
		<FormControl>
			<InputGroup border-color="{null}">
				<Input
					isRequired
					variant="flushed"
					id={id}
					type={type}
					name={name}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
				/>
				{isError ? (
					<></>
				) : (
					<FormErrorMessage>{placeholder} is required.</FormErrorMessage>
				)}
			</InputGroup>
		</FormControl>
	)
}
export default observer(FInput)
