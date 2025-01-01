import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Query,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../user/user.decorator'

import { OrderByWithPagination } from '../dto/pagination.dto'
import { TransactionDto } from './transaction.dto'
import { TransactionService } from './transaction.service'

@Controller('transactions')
export class TransactionController {
	constructor(private readonly transactionService: TransactionService) {}

	@UsePipes(new ValidationPipe())
	@Get()
	@Auth()
	async getAllByCurrentUser(
		@CurrentUser('id') id: number,
		@Query() queryDto: OrderByWithPagination
	) {
		return this.transactionService.getAll(id, queryDto)
	}

	@Get(':id')
	@Auth()
	async getTransaction(@Param('id') id: string) {
		return this.transactionService.byId(+id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	@Auth()
	async createTransaction(
		@CurrentUser('id') id: number,
		@Body() dto: TransactionDto
	) {
		return this.transactionService.create(id, dto)
	}

	@HttpCode(200)
	@Delete(':id')
	@Auth()
	async deleteTransaction(@Param('id') id: string) {
		return this.transactionService.delete(+id)
	}
}
