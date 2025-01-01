import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { TransactionService } from 'src/transaction/transaction.service'
import { UserService } from 'src/user/user.service'
import { CardController } from './card.controller'
import { CardService } from './card.service'

@Module({
	controllers: [CardController],
	providers: [CardService, PrismaService, TransactionService, UserService],
	exports: [CardService]
})
export class CardModule {}
