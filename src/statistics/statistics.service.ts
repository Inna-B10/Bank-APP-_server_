import { Injectable } from '@nestjs/common'
import { EnumTransactionType } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'

require('json-bigint-patch')

export enum EnumSortType {
	day = 'day',
	month = 'month'
}

@Injectable()
export class StatisticsService {
	constructor(private prisma: PrismaService) {}

	#statisticOutput(income = 0, expense = 0) {
		return [
			{
				label: 'Income',
				value: income
			},
			{
				label: 'Expense',
				value: expense
			}
		]
	}

	async getMain(userId: number) {
		try {
			const { _sum: income } = await this.prisma.transaction.aggregate({
				_sum: {
					amount: true
				},
				where: {
					card: {
						userId
					},
					type: EnumTransactionType.TOP_UP
				}
			})

			const { _sum: expense } = await this.prisma.transaction.aggregate({
				_sum: {
					amount: true
				},
				where: {
					card: {
						userId
					},
					type: EnumTransactionType.WITHDRAWAL
				}
			})

			return this.#statisticOutput(income.amount, expense.amount)
		} catch (error) {
			return this.#statisticOutput()
		}
	}
}
