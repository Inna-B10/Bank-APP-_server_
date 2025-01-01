import { Prisma } from '@prisma/client'

export const cardOutput: Prisma.CardSelect = {
	id: true,
	balance: true,
	cvc: true,
	expireDate: true,
	number: true,
	paymentSystem: true,
	createdAt: true,
	userId: true
}
