import { makeObservable, observable, action, runInAction } from "mobx"
import flightData from "../database/flightData"

export class FlightDataStore {
	selectedFlight = ""

	set = (key, value) => {
		runInAction(() => {
			this[key] = value
		})
	}

	// Generation
	generateFlightNumber = () => {
		let flightNumber = ""
		let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "0123456789"
		for (let i = 1; i <= 6; i++) {
			let char = Math.floor(Math.random() * str.length + 1)
			flightNumber += str.charAt(char)
		}
		return flightNumber
	}

	generateLocations = () => {
		let countryList = [
			"Afghanistan",
			"Albania",
			"Algeria",
			"Andorra",
			"Angola",
			"Antigua & Deps",
			"Argentina",
			"Armenia",
			"Australia",
			"Austria",
			"Azerbaijan",
			"Bahamas",
			"Bahrain",
			"Bangladesh",
			"Barbados",
			"Belarus",
			"Belgium",
			"Belize",
			"Benin",
			"Bhutan",
			"Bolivia",
			"Bosnia Herzegovina",
			"Botswana",
			"Brazil",
			"Brunei",
			"Bulgaria",
			"Burkina",
			"Burundi",
			"Cambodia",
			"Cameroon",
			"Canada",
			"Cape Verde",
			"Central African Rep",
			"Chad",
			"Chile",
			"China",
			"Colombia",
			"Comoros",
			"Congo",
			"Congo {Democratic Rep}",
			"Costa Rica",
			"Croatia",
			"Cuba",
			"Cyprus",
			"Czech Republic",
			"Denmark",
			"Djibouti",
			"Dominica",
			"Dominican Republic",
			"East Timor",
			"Ecuador",
			"Egypt",
			"El Salvador",
			"Equatorial Guinea",
			"Eritrea",
			"Estonia",
			"Ethiopia",
			"Fiji",
			"Finland",
			"France",
			"Gabon",
			"Gambia",
			"Georgia",
			"Germany",
			"Ghana",
			"Greece",
			"Grenada",
			"Guatemala",
			"Guinea",
			"Guinea-Bissau",
			"Guyana",
			"Haiti",
			"Honduras",
			"Hungary",
			"Iceland",
			"India",
			"Indonesia",
			"Iran",
			"Iraq",
			"Ireland {Republic}",
			"Israel",
			"Italy",
			"Ivory Coast",
			"Jamaica",
			"Japan",
			"Jordan",
			"Kazakhstan",
			"Kenya",
			"Kiribati",
			"Korea North",
			"Korea South",
			"Kosovo",
			"Kuwait",
			"Kyrgyzstan",
			"Laos",
			"Latvia",
			"Lebanon",
			"Lesotho",
			"Liberia",
			"Libya",
			"Liechtenstein",
			"Lithuania",
			"Luxembourg",
			"Macedonia",
			"Madagascar",
			"Malawi",
			"Malaysia",
			"Maldives",
			"Mali",
			"Malta",
			"Marshall Islands",
			"Mauritania",
			"Mauritius",
			"Mexico",
			"Micronesia",
			"Moldova",
			"Monaco",
			"Mongolia",
			"Montenegro",
			"Morocco",
			"Mozambique",
			"Myanmar, {Burma}",
			"Namibia",
			"Nauru",
			"Nepal",
			"Netherlands",
			"New Zealand",
			"Nicaragua",
			"Niger",
			"Nigeria",
			"Norway",
			"Oman",
			"Pakistan",
			"Palau",
			"Panama",
			"Papua New Guinea",
			"Paraguay",
			"Peru",
			"Philippines",
			"Poland",
			"Portugal",
			"Qatar",
			"Romania",
			"Russian Federation",
			"Rwanda",
			"St Kitts & Nevis",
			"St Lucia",
			"Saint Vincent & the Grenadines",
			"Samoa",
			"San Marino",
			"Sao Tome & Principe",
			"Saudi Arabia",
			"Senegal",
			"Serbia",
			"Seychelles",
			"Sierra Leone",
			"Singapore",
			"Slovakia",
			"Slovenia",
			"Solomon Islands",
			"Somalia",
			"South Africa",
			"South Sudan",
			"Spain",
			"Sri Lanka",
			"Sudan",
			"Suriname",
			"Swaziland",
			"Sweden",
			"Switzerland",
			"Syria",
			"Taiwan",
			"Tajikistan",
			"Tanzania",
			"Thailand",
			"Togo",
			"Tonga",
			"Trinidad & Tobago",
			"Tunisia",
			"Turkey",
			"Turkmenistan",
			"Tuvalu",
			"Uganda",
			"Ukraine",
			"United Arab Emirates",
			"United Kingdom",
			"United States",
			"Uruguay",
			"Uzbekistan",
			"Vanuatu",
			"Vatican City",
			"Venezuela",
			"Vietnam",
			"Yemen",
			"Zambia",
			"Zimbabwe",
		]
		let rand1 = Math.floor(Math.random() * countryList.length)
		let rand2 = Math.floor(Math.random() * countryList.length)
		while (rand1 === rand2) {
			rand2 = Math.floor(Math.random() * countryList.length)
		}
		let randOrigin = countryList[rand1]
		let randDestination = countryList[rand2]

		const locations = { origin: randOrigin, destination: randDestination }
		return locations
	}

	generateDateTime = () => {
		const today = new Date()
		const startDateTime = new Date(
			today.getTime() + Math.random() * (30 * 24 * 60 * 60 * 1000)
		)

		const startHour = Math.floor(Math.random() * 24)
		const duration = Math.floor(Math.random() * 23) + 1

		let endHour = startHour + duration
		if (endHour >= 24) {
			endHour -= 24
			startDateTime.setDate(startDateTime.getDate() + 1)
		}

		startDateTime.setHours(startHour)

		const endDateTime = new Date(startDateTime)
		endDateTime.setHours(endHour)

		return {
			startDate: startDateTime.toDateString(),
			startTime: startDateTime.toLocaleTimeString("en-US", {
				hour: "2-digit",
				minute: "2-digit",
			}),
			endDate: endDateTime.toDateString(),
			endTime: endDateTime.toLocaleTimeString("en-US", {
				hour: "2-digit",
				minute: "2-digit",
			}),
		}
	}

	generateSeats = () => {
		let seats = []

		for (let i = 0; i < 15; i++) {
			let seat = { id: i, user: null, services: [] }
			seats[i] = seat
		}
		return seats
	}

	fillFlights = () => {
		while (flightData.length < 100) {
			let flightDateTime = this.generateDateTime()
			for (let i = 0; i < 100; i++) {
				let fn = this.generateFlightNumber()
				let loc = this.generateLocations()
				let or = loc.origin
				let des = loc.destination
				let seatArr = this.generateSeats()
				let flight = {
					flightNumber: fn,
					origin: or,
					destination: des,
					startTime: flightDateTime.startTime,
					startDate: flightDateTime.startDate,
					endTime: flightDateTime.endTime,
					endDate: flightDateTime.endDate,
					seats: seatArr,
				}
				flightData.push(flight)
			}
			//console.log(flightData)
		}
	}

	// Getters
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

	getSeatList = (seats) => {
		let seatList = []
		seats.map((seat) => seatList.push(this.getSeatName(seat.id)))
		return seatList
	}

	getSeatsLeftCount = (seatArr) => {
		let seatsLeft = seatArr.length
		for (let i = 0; i < seatArr.length; i++) {
			if (seatArr[i].user != null) {
				seatsLeft--
			}
		}
		return seatsLeft
	}

	// Getters
	getFlight = (id) => {
		for (let i = 0; i < flightData.length; i++) {
			if (id == flightData[i].flightNumber) {
				//flight found
				const flight = {
					flightNumber: flightData[i].flightNumber,
					origin: flightData[i].origin,
					destination: flightData[i].destination,
					startTime: flightData[i].startTime,
					startDate: flightData[i].startDate,
					endTime: flightData[i].endTime,
					endDate: flightData[i].endData,
					seats: flightData[i].seats,
				}
				return flight
			}
		}
	}

	getServices = (seat, flightNumber) => {
		let servicesArr = []
		for (let i = 0; i < flightData.length; i++) {
			if (flightData[i].flightNumber === flightNumber) {
				for (let j = 0; j < flightData[i].seats.length; j++) {
					if (flightData[i].seats[j].id === seat.id) {
						for (let y = 0; y < flightData[i].seats[j].services.length; y++) {
							servicesArr.push(flightData[i].seats[j].services[y])
						}
					}
				}
			}
		}
		return servicesArr
	}

	// Flight Modification
	addUser = (flightNumber, seat, user) => {
		for (let i = 0; i < flightData.length; i++) {
			if (flightData[i].flightNumber === flightNumber) {
				for (let j = 0; j < flightData[i].seats.length; j++) {
					if (flightData[i].seats[j].id === seat.id) {
						flightData[i].seats[j].user = user
					}
				}
			}
		}
	}

	removeUser = (flightNumber, seat) => {
		for (let i = 0; i < flightData.length; i++) {
			if (flightData[i].flightNumber === flightNumber) {
				for (let j = 0; j < flightData[i].seats.length; j++) {
					if (flightData[i].seats[j].id === seat.id) {
						flightData[i].seats[j].user = null
						flightData[i].seats[j].services = []
					}
				}
			}
		}
	}

	addService = (flightNumber, seat, service) => {
		for (let i = 0; i < flightData.length; i++) {
			if (flightData[i].flightNumber === flightNumber) {
				for (let j = 0; j < flightData[i].seats.length; j++) {
					if (flightData[i].seats[j].id === seat.id) {
						let currentDate = new Date()
						let id = currentDate.getSeconds()
						let serviceObj = { name: service, id: id }
						flightData[i].seats[j].services.push(serviceObj)
					}
				}
			}
		}
	}

	removeService = (flightNumber, seat, serviceID) => {
		for (let i = 0; i < flightData.length; i++) {
			if (flightData[i].flightNumber === flightNumber) {
				for (let j = 0; j < flightData[i].seats.length; j++) {
					if (flightData[i].seats[j].id === seat.id) {
						for (let k = 0; k < flightData[i].seats[j].services.length; k++) {
							if (flightData[i].seats[j].services[k].id === serviceID) {
								// remove service
								flightData[i].seats[j].services.splice(k, 1)
							}
						}
					}
				}
			}
		}
	}

	constructor() {
		makeObservable(this, {
			selectedFlight: observable,
			set: action,
		})
	}
}
export const FlightStore = new FlightDataStore()
