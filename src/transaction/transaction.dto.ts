import { EnumTransactionType } from '@prisma/client'
import { IsEnum } from 'class-validator'

export class TransactionDto {
	@IsEnum(EnumTransactionType)
	type: EnumTransactionType
}
