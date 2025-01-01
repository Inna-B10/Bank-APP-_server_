import { Prisma } from '@prisma/client'

export const transactionOutput: Prisma.TransactionSelect = {
	id: true,
	createdAt: true,
	amount: true,
	type: true
}
