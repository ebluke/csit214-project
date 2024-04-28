import { makeObservable, observable, action, runInAction } from "mobx"

// Contains State for single user (scrapping functional backened, beyond scope)
export class UserDataStore {
	// User Data (stored in backend)
	users = []
	loadCounter = 0

	// Session Data
	email = ""
	fullName = ""
	password = ""
	mobileNumber = ""

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
			mobile: "0412345678",
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

	getUserData = () => {
		const user = {
			email: this.email,
			fullName: this.fullName,
			password: this.password,
			mobileNumber: this.mobileNumber,
		}
		return user
	}

	// Account Management
	createAccount = () => {
		this.isLoading = true
		// Check email doesnt exist
		try {
			for (let i = 0; i < this.users.length; i++) {
				if (this.users[i].email === this.email) {
					throw Error()
				}
			}
		} catch (err) {
			console.log(err)
			this.set("errMsg", "Email already in use")
		}

		this.users[this.users.length + 1] = this.getUserData()

		//If success
		// add toast message
		this.isLoading = false
		console.log(this.users)
	}

	login = (uname, pword) => {
		let emailFound = false
		let success = false
		try {
			if (this.users.length <= 0) {
				this.set("errMsg", "Email not found")
				throw new Error()
			}
			for (let i = 1; i < this.users.length; i++) {
				if (this.users[i].email === uname) {
					emailFound = true
					if (this.users[i].password === pword) {
						// Success, login
						success = true
					} else {
						this.set("errMsg", "Invalid Password")
						throw new Error()
					}
				} else {
					this.set("errMsg", "Email not found")
					throw new Error()
				}
			}
			if (emailFound === false) {
				console.log("email not found")
				this.set("errMsg", "Email not found")
			}
			if (success === true) {
				console.log("logged in")
				this.set("isLoggedIn", true)
				this.set("errMsg", "")
			} else {
				console.log("not successful logging in")
			}
		} catch (err) {}
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
