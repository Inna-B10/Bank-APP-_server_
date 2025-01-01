import { Prisma } from '@prisma/client'
import { cardOutput } from 'src/card/card.output'

export const userOutput: Prisma.UserSelect = {
	email: true,
	id: true,
	name: true,
	avatarPath: true,
	password: false,
	card: {
		select: cardOutput
	}
}
