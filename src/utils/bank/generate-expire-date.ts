export function generateExpiryDate(): string {
	const currentYear = new Date().getFullYear()
	const currentMonth = new Date().getMonth()
	const expiryYear = currentYear + Math.floor(Math.random() * 5) + 1
	let expiryMonth = Math.floor(Math.random() * 12) + 1
	if (expiryYear === currentYear && expiryMonth < currentMonth) {
		expiryMonth += currentMonth
	}

	return `${expiryMonth}/${expiryYear.toString().slice(2, 4)}`
}
