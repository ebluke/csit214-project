import { makeObservable, observable, action, runInAction } from "mobx"
import userData from "../database/userData"

// Contains State for single user (scrapping functional backened, beyond scope)
export class UserDataStore {
	// User Data (stored in backend)

	// Session Data
	email = ""
	fullName = ""
	password = ""
	mobileNumber = null

	// Error message
	errMsg = ""

	// State helpers
	isLoading = false
	isLoggedIn = false

	// Navigation helpers

	// Prefill data for user
	usersPrefill = () => {
		const admin = {
			email: "admin@gmail.com",
			fullName: "admin",
			password: "admin",
			mobileNumber: "0412345678",
			flights: [],
		}
		this.users[0] = admin
	}

	// Store Functions
	set = (key, value) => {
		runInAction(() => {
			this[key] = value
		})
	}

	clearSessionData = () => {
		this.set("email", "")
		this.set("fullName", "")
		this.set("password", "")
		this.set("mobileNumber", "")
	}

	getUserData = (email) => {
		for (let i = 0; i < userData.length; i++) {
			if (email === userData[i].email) {
				const user = {
					id: userData[i].id,
					email: userData[i].email,
					fullName: userData[i].fullName,
					password: userData[i].password,
					mobileNumber: userData[i].mobileNumber,
					flights: userData[i].flights,
				}
				return user
			}
		}
	}
	getSeatName = (seatNum) => {
		switch (seatNum) {
			case 0:
				return "A1"
			case 1:
				return "B1"
			case 2:
				return "C1"
			case 3:
				return "A2"
			case 4:
				return "B2"
			case 5:
				return "C2"
			case 6:
				return "A3"
			case 7:
				return "B3"
			case 8:
				return "C3"
			case 9:
				return "A4"
			case 10:
				return "B4"
			case 11:
				return "C4"
			case 12:
				return "A5"
			case 13:
				return "B5"
			case 14:
				return "C5"
			default:
				return "null"
		}
	}

	getSeats = (flightNumber) => {
		let seats = []
		for (let i = 0; i < userData.length; i++) {
			if (this.email === userData[i].email) {
				for (let j = 0; j < userData[i].flights.length; j++) {
					if (flightNumber === userData[i].flights[j].flightNumber) {
						for (let k = 0; k < userData[i].flights[j].seats.length; k++) {
							let services = []
							for (
								let p = 0;
								p < userData[i].flights[j].seats[k].services.length;
								p++
							) {
								services.push(userData[i].flights[j].seats[k].services[p])
							}
							let seat = {
								id: userData[i].flights[j].seats[k].id,
								user: userData[i].flights[j].seats[k].user,
								services: services,
							}
							seats.push(seat)
						}
					}
				}
			}
		}
		return seats
	}

	getServices = (flightNumber, seat) => {
		let serviceArr = []
		const user = this.getUserData(this.email)
		for (let i = 0; i < user.flights.length; i++) {
			if (user.flights[i].flightNumber === flightNumber) {
				for (let j = 0; j < user.flights[i].seats.length; j++) {
					if (user.flights[i].seats[j].id === seat.id) {
						for (let k = 0; k < seat.services.length; k++) {
							serviceArr.push(seat.services[k])
						}
					}
				}
			}
		}
		console.log(serviceArr)
		return serviceArr
	}

	// Data Manipulation
	addUser = (user) => {
		userData.push(user)
	}

	removeFlight = (seat, flightNumber) => {
		const user = this.getUserData(this.email)
		// find seat in flights (user.flights)
		for (let i = 0; i < user.flights.length; i++) {
			if (user.flights[i].flightNumber === flightNumber) {
				for (let j = 0; j < user.flights[i].seats.length; j++) {
					if (user.flights[i].seats.length === 1) {
						// remove seat, then remove flight
						user.flights[i].seats.splice(j, 1)
						user.flights.splice(j, 1)
						return
					} else if (user.flights[i].seats[j].id === seat.id) {
						// remove flight from user
						user.flights[i].seats.splice(j, 1)
					}
				}
			}
		}
	}

	addFlight = (
		flightNumber,
		origin,
		destination,
		startDate,
		startTime,
		endDate,
		endTime,
		seat
	) => {
		let flightUnique = true
		const user = this.getUserData(this.email)
		for (let i = 0; i < user.flights.length; i++) {
			if (flightNumber === user.flights[i].flightNumber) {
				flightUnique = false
				seat.user = this.email
				user.flights[i].seats.push(seat)
			}
		}
		if (flightUnique) {
			const newFlight = {
				flightNumber: flightNumber,
				origin: origin,
				destination: destination,
				startDate: startDate,
				startTime: startTime,
				endDate: endDate,
				endTime: endTime,
				seats: [],
			}
			seat.user = this.email
			newFlight.seats.push(seat)

			user.flights.push(newFlight)
		}
	}

	addService = (flightNumber, seat, service) => {
		const user = this.getUserData(this.email)
		console.log("seat: " + seat)
		console.log("Service: " + service)

		for (let i = 0; i < user.flights.length; i++) {
			if (flightNumber === user.flights[i].flightNumber) {
				// check seat matches
				for (let j = 0; j < user.flights[i].seats.length; j++) {
					if (seat === user.flights[i].seats[j].id) {
						let currentDate = new Date()
						let id = Math.floor(
							Math.random() *
								(currentDate.getSeconds() * currentDate.getMilliseconds())
						)
						// ideally check here if id is unqiue (im just hoping it is for testing sake
						let serviceObj = { name: service, id: id }
						user.flights[i].seats[j].services.push(serviceObj)
					}
				}
			}
		}
	}

	removeService = (flightNumber, seat, serviceID) => {
		const user = this.getUserData(this.email)
		// service in seat in flight in user

		for (let i = 0; i < user.flights.length; i++) {
			if (user.flights[i].flightNumber === flightNumber) {
				console.log("1")

				for (let j = 0; j < user.flights[i].seats.length; j++) {
					if (user.flights[i].seats[j].id === seat.id) {
						console.log("2")

						for (let k = 0; k < user.flights[i].seats[j].services.length; k++) {
							console.log(user.flights[i].seats[j].services[k].id)
							if (user.flights[i].seats[j].services[k].id === serviceID) {
								// remove service
								console.log("remove with splice")
								user.flights[i].seats[j].services.splice(k, 1)
							}
						}
					}
				}
			}
		}
	}

	// Account Management
	createAccount = () => {
		this.isLoading = true
		let success = true
		// Check email doesnt exist
		try {
			for (let i = 0; i < userData.length; i++) {
				if (userData[i].email === this.email) {
					// email already exists
					this.set("errMsg", "Email already in use")
					success = false
					throw new Error()
				}
			}
		} catch (err) {}
		if (success) {
			let id = userData.length
			const user = {
				id: id,
				email: this.email,
				fullName: this.fullName,
				password: this.password,
				mobileNumber: this.mobileNumber,
				flights: [],
			}
			this.addUser(user)
		}

		this.isLoading = false
		return success
	}

	login = (uname, pword) => {
		console.log("uname: " + uname + ", pword: " + pword)
		let success = false
		console.log("login")
		if (uname === "" && pword === "") {
			this.set("errMsg", "Empty inputs")
			return success
		}
		for (let i = 0; i < userData.length; i++) {
			console.log("users: " + userData[i].email)
			if (uname === userData[i].email) {
				if (pword === userData[i].password) {
					//login
					success = true
					this.set("isLoggedIn", true)
					// set userStore data to user fata
					let { email, password, fullName, mobileNumber } =
						this.getUserData(uname)
					this.set("email", email)
					this.set("password", password)
					this.set("fullName", fullName)
					this.set("mobileNumber", mobileNumber)
					return success
				} else {
					this.set("errMsg", "incorrect password")
					return success
				}
			} else {
				this.set("errMsg", "No account")
				console.log("no account")
			}
		}
		return success
	}

	logout = () => {
		this.clearSessionData()
		this.set("isLoggedIn", false)
	}

	constructor() {
		makeObservable(this, {
			email: observable,
			fullName: observable,
			password: observable,
			mobileNumber: observable,
			set: action,
		})
	}
}
export const UserStore = new UserDataStore()
