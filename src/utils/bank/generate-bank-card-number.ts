import { EnumPaymentSystem } from '@prisma/client'

export function generateCardNumberAndSystem() {
	const prefixes = ['2', '4', '5', '6']
	const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
	let number = prefix

	for (let i = 0; i < 15; i++) {
		number += Math.floor(Math.random() * 10)
	}

	let paymentSystem: EnumPaymentSystem = 'MASTERCARD'

	switch (true) {
		case number.startsWith('2'):
			paymentSystem = 'MIR'
			break
		case number.startsWith('4'):
			paymentSystem = 'VISA'
			break
		case number.startsWith('5'):
			paymentSystem = 'MASTERCARD'
			break
		case number.startsWith('6'):
			paymentSystem = 'MAESTRO'
			break
	}

	return { number, paymentSystem }
}
