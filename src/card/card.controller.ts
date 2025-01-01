import {
	Body,
	Controller,
	Get,
	HttpCode,
	Patch,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { EnumTransactionType } from '@prisma/client'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../user/user.decorator'
import { CardService } from './card.service'

import { BalanceDto } from './dto/balance.dto'
import { TransferDto } from './dto/transfer.dto'

@Controller('cards')
export class CardController {
	constructor(private readonly cardService: CardService) {}

	@Get('by-user')
	@Auth()
	async getUserCard(@CurrentUser('id') id: number) {
		return this.cardService.getUserCard(id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	@Auth()
	async createCard(@CurrentUser('id') id: number) {
		return this.cardService.create(id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Patch('balance/top-up')
	@Auth()
	async topUpBalance(
		@CurrentUser('id') userId: number,
		@Body() dto: BalanceDto
	) {
		return this.cardService.updateBalance(
			userId,
			dto,
			EnumTransactionType.TOP_UP
		)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Patch('balance/withdrawal')
	@Auth()
	async withdrawalBalance(
		@CurrentUser('id') userId: number,
		@Body() dto: BalanceDto
	) {
		return this.cardService.updateBalance(
			userId,
			dto,
			EnumTransactionType.WITHDRAWAL
		)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Patch('transfer-money')
	@Auth()
	async transferMoney(
		@CurrentUser('id') userId: number,
		@Body() dto: TransferDto
	) {
		return this.cardService.transferMoney(userId, dto)
	}
}
