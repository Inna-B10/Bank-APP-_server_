import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { UserService } from 'src/user/user.service'
import { OrderByWithPagination } from '../dto/pagination.dto'
import { TransactionDto } from './transaction.dto'
import { transactionOutput } from './transaction.output'

@Injectable()
export class TransactionService {
	constructor(
		private prisma: PrismaService,
		private userService: UserService
	) {}

	async byId(id: number) {
		const transaction = await this.prisma.transaction.findUnique({
			where: {
				id
			},
			select: transactionOutput
		})

		if (!transaction) throw new NotFoundException('Transaction not found!')
		return transaction
	}

	async getAll(userId: number, dto: OrderByWithPagination) {
		const user = await this.userService.byId(userId)
		if (!user.card?.id)
			return {
				transactions: [],
				length: 0
			}

		const page = dto.page ? +dto.page : 1
		const perPage = dto.perPage ? +dto.perPage : 30

		const skip = (page - 1) * perPage

		const transactions = await this.prisma.transaction.findMany({
			where: { cardId: user.card.id },
			skip,
			take: perPage,
			orderBy: {
				createdAt: dto.orderBy || 'desc'
			},
			select: transactionOutput
		})

		return {
			transactions,
			length: await this.prisma.transaction.count({
				where: { cardId: user.card.id }
			})
		}
	}

	async create(cardId: number, dto: TransactionDto, amount?: number) {
		await this.prisma.transaction.create({
			data: {
				type: dto.type,
				cardId,
				amount
			}
		})

		return { message: 'Success' }
	}

	async delete(id: number) {
		return this.prisma.transaction.delete({ where: { id } })
	}
}
